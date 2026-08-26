import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable } from "@/lib/db";
import type { Complaint } from "../route";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { status } = body as { status: Complaint["status"] };

  const complaints = await readTable<Complaint>("complaints");
  const idx = complaints.findIndex((c) => c.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  complaints[idx].status = status;
  complaints[idx].handledBy = session.name;
  complaints[idx].resolvedAt =
    status === "Selesai" ? new Date().toISOString() : complaints[idx].resolvedAt;

  await writeTable("complaints", complaints);
  return NextResponse.json(complaints[idx]);
}
