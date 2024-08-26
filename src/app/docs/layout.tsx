"use client"

import { RootProvider } from "fumadocs-ui/provider"
import type { ReactNode } from "react"

export function NextInjectProvider({ children }: { children: ReactNode }) {
    return <RootProvider>{children}</RootProvider>
}