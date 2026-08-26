import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable } from "@/lib/db";
import type { AppUser } from "../route";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session || session.role !== "superadmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const users = await readTable<AppUser>("users");
  const idx = users.findIndex((u) => u.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  users[idx] = {
    ...users[idx],
    role: body.role ?? users[idx].role,
    status: body.status ?? users[idx].status,
  };
  await writeTable("users", users);
  return NextResponse.json(users[idx]);
}
