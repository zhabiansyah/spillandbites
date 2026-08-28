import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Cek Otentikasi (Sesuai dengan kode asli Anda)
  const session = getSession(); 
  if (!session || session.role !== "superadmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // 2. Update data ke database menggunakan Prisma
    const updatedUser = await prisma.user.update({
      where: { 
        id: params.id 
      },
      data: {
        ...(body.role && { role: body.role }),
        ...(body.status && { status: body.status }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Gagal update user:", error);
    return NextResponse.json(
      { error: "User tidak ditemukan atau gagal diperbarui" },
      { status: 404 }
    );
  }
}