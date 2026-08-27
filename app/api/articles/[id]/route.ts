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
  
  // Mengambil semua data pengguna
  const users = await db.user.findMany({
    orderBy: { joinedAt: 'desc' }, // Mengurutkan dari yang terbaru bergabung
  });
  
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

  // Cek apakah email sudah terdaftar (karena kita set @unique di skema)
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "Email sudah terdaftar." },
      { status: 400 }
    );
  }

  // Membuat user baru di database
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