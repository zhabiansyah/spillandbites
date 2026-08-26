import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, generateId } from "@/lib/db";
import { getSession } from "@/lib/auth";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN" | "SUPERADMIN";
  points: number;
  status: "Aktif" | "Diblokir";
  joinedAt: string;
};

function requireSuperadmin() {
  const session = getSession();
  if (!session || session.role !== "superadmin") {
    return null;
  }
  return session;
}

export async function GET() {
  if (!requireSuperadmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await readTable<AppUser>("users");
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  if (!requireSuperadmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { name, email, role } = body;
  if (!name || !email) {
    return NextResponse.json(
      { error: "Nama dan email wajib diisi." },
      { status: 400 }
    );
  }

  const users = await readTable<AppUser>("users");
  const newUser: AppUser = {
    id: generateId("usr"),
    name,
    email,
    role: role || "ADMIN",
    points: 0,
    status: "Aktif",
    joinedAt: new Date().toISOString(),
  };
  users.push(newUser);
  await writeTable("users", users);
  return NextResponse.json(newUser, { status: 201 });
}
