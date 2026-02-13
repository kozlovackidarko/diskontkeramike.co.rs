import type { NextConfig } from 'next'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] || ''
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGitHubPages && repoName ? `/${repoName}` : '',
  assetPrefix: isGitHubPages && repoName ? `/${repoName}/` : '',
}

export default nextConfig
