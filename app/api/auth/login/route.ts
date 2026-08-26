import { NextRequest, NextResponse } from "next/server";
import { findUser, serializeSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = findUser(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Email atau password salah." },
      { status: 401 }
    );
  }

  const session = {
    email: user.email,
    name: user.name,
    role: user.role,
    branch: user.branch,
  };

  const res = NextResponse.json({ ok: true, session });
  res.cookies.set(SESSION_COOKIE, serializeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam
  });
  return res;
}
