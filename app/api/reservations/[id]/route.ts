import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable } from "@/lib/db";
import type { Reservation } from "../route";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = (await req.json()) as { status: Reservation["status"] };

  const items = await readTable<Reservation>("reservations");
  const idx = items.findIndex((r) => r.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  items[idx].status = status;
  await writeTable("reservations", items);
  return NextResponse.json(items[idx]);
}
