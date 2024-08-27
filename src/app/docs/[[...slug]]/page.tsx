import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import {
    DocsPage,
    DocsBody,
    DocsDescription,
    DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

export default async function Page({
    params,
}: {
    params: { slug?: string[] };
}) {
    const page = getPage(params.slug);

    if (page == null) {
        notFound();
    }

    const MDX = page.data.exports.default;

    return (
        <DocsPage toc={page.data.exports.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return getPages().map((page) => ({
        slug: page.slugs,
    }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
    const page = getPage(params.slug);

    if (page == null) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    } satisfies Metadata;
}
