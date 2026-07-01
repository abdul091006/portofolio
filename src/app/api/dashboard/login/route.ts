import { NextResponse } from "next/server";
import {
  dashboardSessionCookieName,
  getDashboardSessionValue,
  verifyDashboardCredentials,
} from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      email?: unknown;
      password?: unknown;
    };

    if (!verifyDashboardCredentials(payload.email, payload.password)) {
      return NextResponse.json(
        { message: "Credential dashboard tidak valid." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set({
      name: dashboardSessionCookieName,
      value: getDashboardSessionValue(),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Request login tidak valid." },
      { status: 400 },
    );
  }
}
