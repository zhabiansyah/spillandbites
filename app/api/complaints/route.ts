import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, generateId } from "@/lib/db";

export type Complaint = {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  message: string;
  status: "Baru" | "Diproses" | "Selesai";
  createdAt: string;
  resolvedAt: string | null;
  handledBy: string | null;
};

export async function GET() {
  const complaints = await readTable<Complaint>("complaints");
  // Terbaru dulu
  complaints.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json(complaints);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderNumber, name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Nama, email, dan pesan wajib diisi." },
      { status: 400 }
    );
  }

  const complaints = await readTable<Complaint>("complaints");
  const newComplaint: Complaint = {
    id: generateId("cmp"),
    orderNumber: orderNumber || "-",
    name,
    email,
    message,
    status: "Baru",
    createdAt: new Date().toISOString(),
    resolvedAt: null,
    handledBy: null,
  };
  complaints.push(newComplaint);
  await writeTable("complaints", complaints);

  return NextResponse.json(newComplaint, { status: 201 });
}
