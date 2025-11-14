import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['drive.google.com']
    },
    env: {
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.BACKEND_URL
    }
};

export default nextConfig;
