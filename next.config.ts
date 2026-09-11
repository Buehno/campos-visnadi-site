import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O diretório pai contém outro package-lock.json; fixa a raiz do projeto.
  turbopack: { root: __dirname },
};

export default nextConfig;
