/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "QjqLab";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubPages ? `/${repoName}` : "");

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
