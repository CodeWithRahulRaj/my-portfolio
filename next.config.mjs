import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Pin the workspace root so Turbopack ignores the lockfile in the parent
  // directory (it lives outside this git repo and triggered a build warning).
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
