import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Required for Docker
  reactStrictMode: true,
};

module.exports = nextConfig;

export default nextConfig;
