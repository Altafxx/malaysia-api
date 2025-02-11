import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: process.env.NODE_ENV === 'development',
    buildActivityPosition: 'top-right'
  },
};

export default withMDX(nextConfig);
