import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simpan ke database
    const newUser = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
        status: "Aktif", // Status default
        points: 0,       // Point default jika ada
        password: "Spillandbites123",
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error saat POST User:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data atau email sudah terdaftar" }, 
      { status: 500 }
    );
  }
}

function requireSuperadmin() {
  const session = getSession();
  if (!session || session.role !== "superadmin") {
    return null;
  }
  return session;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!requireSuperadmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "User berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
  }
}