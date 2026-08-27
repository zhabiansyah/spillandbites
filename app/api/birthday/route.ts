import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.birthdayBooking.findMany({
    orderBy: { date: 'asc' },
  });
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

  const newItem = await db.birthdayBooking.create({
    data: {
      name,
      phone,
      branch,
      date,
      package: pkg,
      kidsCount: Number(kidsCount),
      notes: notes || "",
      status: "Menunggu Konfirmasi",
    },
  });

  return NextResponse.json(newItem, { status: 201 });
}