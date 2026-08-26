import { NextRequest, NextResponse } from "next/server";
import { readTable, writeTable, generateId } from "@/lib/db";
import { getSession } from "@/lib/auth";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: "Draft" | "Published";
  author: string;
  createdAt: string;
  publishedAt: string | null;
};

export async function GET() {
  const items = await readTable<Article>("articles");
  items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, excerpt, content, status } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Judul dan isi artikel wajib diisi." },
      { status: 400 }
    );
  }

  const items = await readTable<Article>("articles");
  const newItem: Article = {
    id: generateId("art"),
    title,
    excerpt: excerpt || "",
    content,
    status: status === "Published" ? "Published" : "Draft",
    author: session.name,
    createdAt: new Date().toISOString(),
    publishedAt: status === "Published" ? new Date().toISOString() : null,
  };
  items.push(newItem);
  await writeTable("articles", items);

  return NextResponse.json(newItem, { status: 201 });
}
