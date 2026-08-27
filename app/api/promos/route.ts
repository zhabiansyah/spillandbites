import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

function requireSuperadmin() {
  const session = getSession();
  if (!session || session.role !== "superadmin") return null;
  return session;
}

export async function GET() {
  const promos = await db.promo.findMany();
  return NextResponse.json(promos);
}

export async function POST(req: NextRequest) {
  if (!requireSuperadmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await req.json();
  const { title, description, code, discountPercent, validUntil } = body;
  
  if (!title || !code || !validUntil) {
    return NextResponse.json(
      { error: "Judul, kode, dan tanggal berlaku wajib diisi." },
      { status: 400 }
    );
  }

  const newPromo = await db.promo.create({
    data: {
      title,
      description: description || "",
      code,
      discountPercent: Number(discountPercent) || 0,
      validUntil,
      active: true,
    },
  });
  
  return NextResponse.json(newPromo, { status: 201 });
}