import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

function requireSuperadmin() {
  const session = getSession();
  if (!session || session.role !== "superadmin") return null;
  return session;
}

export async function GET() {
  try {
    const promos = await db.promo.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(promos);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data promo" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!requireSuperadmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, code, discountPercent, validUntil } = body;

    if (!title || !code || !validUntil) {
      return NextResponse.json(
        { error: "Judul, kode, dan tanggal berlaku wajib diisi." },
        { status: 400 }
      );
    }

    // Parsing aman tanggal berlaku
    const dateObj = new Date(validUntil);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: "Format tanggal berlaku tidak valid." },
        { status: 400 }
      );
    }

    const newPromo = await db.promo.create({
      data: {
        title,
        description: description || "",
        code: String(code).toUpperCase(),
        discountPercent: Number(discountPercent) || 0,
        validUntil: dateObj.toISOString(),
        active: true,
      },
    });

    return NextResponse.json(newPromo, { status: 201 });
  } catch (error) {
    console.error("POST Promo Error:", error);
    return NextResponse.json(
      { error: "Gagal membuat promo baru" },
      { status: 500 }
    );
  }
}