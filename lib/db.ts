import { promises as fs } from "fs";
import path from "path";

/**
 * Lapisan "database" sederhana berbasis file JSON di folder /data.
 *
 * PENTING untuk produksi: pendekatan ini cocok untuk development lokal
 * atau hosting dengan filesystem persisten (VPS/Docker). Di platform
 * serverless (Vercel dkk) filesystem bersifat read-only/ephemeral saat
 * runtime, jadi tulisan tidak akan tersimpan permanen. Untuk produksi
 * sungguhan, ganti fungsi readTable/writeTable di bawah ini dengan query
 * ke database asli (Postgres/Supabase/MySQL, dst) — struktur data (tipe
 * TypeScript) di masing-masing route API bisa dipertahankan.
 */

const DATA_DIR = path.join(process.cwd(), "data");

export async function readTable<T>(name: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function writeTable<T>(name: string, data: T[]): Promise<void> {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
