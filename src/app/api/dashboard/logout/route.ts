import { NextResponse } from "next/server";
import { dashboardSessionCookieName } from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });

  response.cookies.delete(dashboardSessionCookieName);

  return response;
}
