import { cookies } from "next/headers";

/**
 * Autentikasi DEMO — kredensial hardcoded, sesi berupa cookie berisi
 * JSON sederhana (tidak di-sign/di-enkripsi). Ini cukup untuk
 * mendemokan alur role-based access (Admin vs SuperAdmin), TAPI TIDAK
 * aman untuk produksi. Untuk produksi sungguhan, ganti dengan solusi
 * auth asli seperti NextAuth.js / Lucia / Clerk + hashing password
 * (bcrypt) dan penyimpanan user di database sungguhan.
 */

export type Role = "admin" | "superadmin";

export type Session = {
  email: string;
  name: string;
  role: Role;
  branch?: string;
};

const DEMO_USERS: (Session & { password: string })[] = [
  {
    email: "admin@spillandbites.com",
    password: "admin123",
    name: "Admin Kemang",
    role: "admin",
    branch: "Jakarta — Kemang",
  },
  {
    email: "superadmin@spillandbites.com",
    password: "super123",
    name: "Super Admin",
    role: "superadmin",
  },
];

const COOKIE_NAME = "sb_session";

export function findUser(email: string, password: string) {
  return DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
}

export function serializeSession(session: Session): string {
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export function deserializeSession(value: string): Session | null {
  try {
    return JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export function getSession(): Session | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return deserializeSession(raw);
}

export const SESSION_COOKIE = COOKIE_NAME;
