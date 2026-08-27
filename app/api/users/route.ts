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