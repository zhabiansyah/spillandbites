import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // <-- Ubah import ini untuk memanggil Prisma
import { getSession } from "@/lib/auth";

// Catatan: Tipe AppUser bisa dihapus jika Anda sudah menggunakan Prisma, 
// karena Prisma secara otomatis membuatkan tipe (type) dari schema.prisma Anda.

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
  
  // PRISMA: Mengambil semua data user dari database
  const users = await prisma.user.findMany();
  
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

  // PRISMA: Menyimpan user baru langsung ke database
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      role: role || "ADMIN",
      points: 0,
      status: "Aktif",
      // Catatan: 'id' dan 'joinedAt' tidak perlu diisi manual 
      // jika di file schema.prisma Anda sudah menggunakan @default(cuid()) dan @default(now())
    },
  });
  
  return NextResponse.json(newUser, { status: 201 });
}