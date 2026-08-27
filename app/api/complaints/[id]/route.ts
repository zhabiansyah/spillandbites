import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  // Mengambil data dan langsung diurutkan dari yang paling baru (descending)
  const complaints = await db.complaint.findMany({
    orderBy: { createdAt: 'desc' },
  });
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

  const newComplaint = await db.complaint.create({
    data: {
      orderNumber: orderNumber || "-",
      name,
      email,
      message,
      status: "Baru",
    },
  });

  return NextResponse.json(newComplaint, { status: 201 });
}