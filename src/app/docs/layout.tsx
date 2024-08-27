import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { docsOptions } from '@/app/layout.config';
import 'fumadocs-ui/style.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body>
                <RootProvider>
                    <DocsLayout {...docsOptions}>{children}</DocsLayout>
                </RootProvider >
            </body>
        </html >
    )
}



