import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

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
  
  // Gunakan db.user, bukan prisma.user
  const users = await db.user.findMany();
  
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

  // Gunakan db.user, bukan prisma.user
  const newUser = await db.user.create({
    data: {
      name,
      email,
      role: role || "ADMIN",
      points: 0,
      status: "Aktif",
    },
  });
  
  return NextResponse.json(newUser, { status: 201 });
}