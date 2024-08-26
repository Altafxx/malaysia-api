import { map } from '@/../.map';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

export const { getPage, getPages, pageTree } = loader({
    baseUrl: '/docs',
    rootDir: './docs',
    source: createMDXSource(map),
});


// https://www.danielfullstack.com/article/setup-fumadocs-with-nextjs-in-5-minutes