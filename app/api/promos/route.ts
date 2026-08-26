import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, generateId } from "@/lib/db";
import { getSession } from "@/lib/auth";

export type Promo = {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercent: number;
  validUntil: string;
  active: boolean;
};

function requireSuperadmin() {
  const session = getSession();
  if (!session || session.role !== "superadmin") return null;
  return session;
}

export async function GET() {
  const promos = await readTable<Promo>("promos");
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

  const promos = await readTable<Promo>("promos");
  const newPromo: Promo = {
    id: generateId("promo"),
    title,
    description: description || "",
    code,
    discountPercent: Number(discountPercent) || 0,
    validUntil,
    active: true,
  };
  promos.push(newPromo);
  await writeTable("promos", promos);
  return NextResponse.json(newPromo, { status: 201 });
}
