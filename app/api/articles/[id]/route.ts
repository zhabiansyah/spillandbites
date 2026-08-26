import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable } from "@/lib/db";
import type { Article } from "../route";
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
  const items = await readTable<Article>("articles");
  const idx = items.findIndex((a) => a.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const current = items[idx];
  const updated: Article = {
    ...current,
    title: body.title ?? current.title,
    excerpt: body.excerpt ?? current.excerpt,
    content: body.content ?? current.content,
    status: body.status ?? current.status,
    publishedAt:
      body.status === "Published" && current.status !== "Published"
        ? new Date().toISOString()
        : current.publishedAt,
  };
  items[idx] = updated;
  await writeTable("articles", items);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await readTable<Article>("articles");
  const filtered = items.filter((a) => a.id !== params.id);
  await writeTable("articles", filtered);
  return NextResponse.json({ ok: true });
}
