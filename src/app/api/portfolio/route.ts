import { NextResponse } from "next/server";
import {
  getPortfolioContent,
  savePortfolioContent,
} from "@/lib/portfolio-store";
import { isDashboardAuthenticated } from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isDashboardAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const content = await getPortfolioContent();

  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function PUT(request: Request) {
  if (!(await isDashboardAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const content = await savePortfolioContent(payload);

    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Gagal menyimpan data portfolio." },
      { status: 400 },
    );
  }
}
