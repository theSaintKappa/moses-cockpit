/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.saintkappa.dev",
                pathname: "/moses/**",
            },
        ],
    },
};

export default nextConfig;
