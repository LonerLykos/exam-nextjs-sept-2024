import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dummyjson.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
                pathname: '/**',
            },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    experimental: {
        optimizeCss: true,
    },
};

export default nextConfig;
