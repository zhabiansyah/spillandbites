import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  // Prisma akan mengambil data dan langsung mengurutkannya berdasarkan tanggal
  const items = await db.reservation.findMany({
    orderBy: { date: 'asc' },
  });
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

  // Prisma akan membuatkan ID acak dan tanggal createdAt secara otomatis
  const newItem = await db.reservation.create({
    data: {
      name,
      phone,
      branch,
      date,
      time,
      guests: Number(guests),
      notes: notes || "",
      status: "Menunggu Konfirmasi",
    },
  });

  return NextResponse.json(newItem, { status: 201 });
};