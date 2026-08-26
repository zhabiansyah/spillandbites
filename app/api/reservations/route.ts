import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, generateId } from "@/lib/db";

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  branch: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
  status: "Menunggu Konfirmasi" | "Dikonfirmasi" | "Dibatalkan";
  createdAt: string;
};

export async function GET() {
  const items = await readTable<Reservation>("reservations");
  items.sort((a, b) => (a.date < b.date ? -1 : 1));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, branch, date, time, guests, notes } = body;

  if (!name || !phone || !branch || !date || !time || !guests) {
    return NextResponse.json(
      { error: "Lengkapi semua data reservasi." },
      { status: 400 }
    );
  }

  const items = await readTable<Reservation>("reservations");
  const newItem: Reservation = {
    id: generateId("rsv"),
    name,
    phone,
    branch,
    date,
    time,
    guests: Number(guests),
    notes: notes || "",
    status: "Menunggu Konfirmasi",
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  await writeTable("reservations", items);

  return NextResponse.json(newItem, { status: 201 });
}
