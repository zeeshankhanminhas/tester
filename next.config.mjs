const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").pop() ?? "";
const isProjectPages = repositoryName.length > 0 && !repositoryName.endsWith(".github.io");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProjectPages ? `/${repositoryName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
};

export default nextConfig;
