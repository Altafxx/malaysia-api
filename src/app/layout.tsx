import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
    subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
