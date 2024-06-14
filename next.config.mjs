/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.saintkappa.dev",
                pathname: "/moses/**",
            },
            {
                protocol: "https",
                hostname: "api.saintkappa.dev",
                pathname: "/moses/pics/random",
            },
        ],
    },
};

export default nextConfig;
