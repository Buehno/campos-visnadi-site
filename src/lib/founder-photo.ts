import "server-only";
import fs from "node:fs";
import path from "node:path";

export type FounderPhoto = { src: string; width: number; height: number };

/**
 * Foto oficial recortada (gerada por scripts/process-photo.py). Enquanto o
 * arquivo não existir, o cartão do fundador usa o símbolo da marca.
 */
export function getFounderPhoto(): FounderPhoto | null {
  const file = path.join(process.cwd(), "public", "brand", "thiago-visnadi.png");
  if (!fs.existsSync(file)) return null;
  const png = fs.readFileSync(file);
  return { src: "/brand/thiago-visnadi.png", width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}
