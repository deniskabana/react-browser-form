/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "",
  basePath: "",
};

const isGithubActions = process.env.GITHUB_ACTIONS || false;
if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

  nextConfig.assetPrefix = `/${repo}/`;
  nextConfig.basePath = `/${repo}`;
}

module.exports = nextConfig;
