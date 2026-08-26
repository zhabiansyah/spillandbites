import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, generateId } from "@/lib/db";

export type BirthdayBooking = {
  id: string;
  name: string;
  phone: string;
  branch: string;
  date: string;
  package: "Spill Kids 1" | "Spill Kids 2";
  kidsCount: number;
  notes: string;
  status: "Menunggu Konfirmasi" | "Dikonfirmasi" | "Dibatalkan";
  createdAt: string;
};

export async function GET() {
  const items = await readTable<BirthdayBooking>("birthday");
  items.sort((a, b) => (a.date < b.date ? -1 : 1));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, branch, date, package: pkg, kidsCount, notes } = body;

  if (!name || !phone || !branch || !date || !pkg || !kidsCount) {
    return NextResponse.json(
      { error: "Lengkapi semua data booking ulang tahun." },
      { status: 400 }
    );
  }

  const items = await readTable<BirthdayBooking>("birthday");
  const newItem: BirthdayBooking = {
    id: generateId("bday"),
    name,
    phone,
    branch,
    date,
    package: pkg,
    kidsCount: Number(kidsCount),
    notes: notes || "",
    status: "Menunggu Konfirmasi",
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  await writeTable("birthday", items);

  return NextResponse.json(newItem, { status: 201 });
}
