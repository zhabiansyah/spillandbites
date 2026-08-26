import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable } from "@/lib/db";
import type { Promo } from "../route";
import { getSession } from "@/lib/auth";

function requireSuperadmin() {
  const session = getSession();
  if (!session || session.role !== "superadmin") return null;
  return session;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!requireSuperadmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const promos = await readTable<Promo>("promos");
  const idx = promos.findIndex((p) => p.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  promos[idx] = { ...promos[idx], ...body };
  await writeTable("promos", promos);
  return NextResponse.json(promos[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!requireSuperadmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const promos = await readTable<Promo>("promos");
  const filtered = promos.filter((p) => p.id !== params.id);
  await writeTable("promos", filtered);
  return NextResponse.json({ ok: true });
}
