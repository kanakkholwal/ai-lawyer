/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  swcMinify: true,
  compiler: { styledComponents: { ssr: true } },
  reactStrictMode: true,
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  },

}

module.exports = nextConfig
