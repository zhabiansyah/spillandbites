import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readTable } from "@/lib/db";
import type { Complaint } from "@/app/api/complaints/route";

/**
 * Data revenue & best-seller di bawah ini MOCK — belum ada model
 * Order/Transaction sungguhan di lapisan data saat ini. Begitu ada
 * sistem order asli, ganti bagian ini dengan agregasi query dari tabel
 * order (SUM harga per hari, GROUP BY menu, dst).
 */
const MOCK_REVENUE = [
  { day: "Sen", revenue: 4200000 },
  { day: "Sel", revenue: 3800000 },
  { day: "Rab", revenue: 5100000 },
  { day: "Kam", revenue: 4700000 },
  { day: "Jum", revenue: 6300000 },
  { day: "Sab", revenue: 8100000 },
  { day: "Min", revenue: 7400000 },
];

const MOCK_BEST_SELLERS = [
  { name: "Spill Boneless Fried Chicken", sold: 412 },
  { name: "Burger Mozzarella Drench", sold: 356 },
  { name: "Cheese Lava Fries", sold: 298 },
  { name: "Ice Llips Caramel Creamy Latte", sold: 271 },
  { name: "Trio Saus Spill", sold: 245 },
];

export async function GET() {
  const session = getSession();
  if (!session || session.role !== "superadmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const complaints = await readTable<Complaint>("complaints");
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Selesai");
  const resolvedCount = resolved.length;

  const avgResolutionHours =
    resolved.length > 0
      ? resolved.reduce((sum, c) => {
          if (!c.resolvedAt) return sum;
          const diff =
            new Date(c.resolvedAt).getTime() - new Date(c.createdAt).getTime();
          return sum + diff / (1000 * 60 * 60);
        }, 0) / resolved.length
      : 0;

  return NextResponse.json({
    revenue: MOCK_REVENUE,
    bestSellers: MOCK_BEST_SELLERS,
    complaintStats: {
      total,
      resolved: resolvedCount,
      resolutionRate: total > 0 ? Math.round((resolvedCount / total) * 100) : 0,
      avgResolutionHours: Math.round(avgResolutionHours * 10) / 10,
    },
  });
}
