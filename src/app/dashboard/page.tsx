import type { Metadata } from "next";
import DashboardLogin from "@/components/DashboardLogin";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import { isDashboardAuthenticated } from "@/lib/dashboard-auth";

export const metadata: Metadata = {
  title: "Dashboard | Software Engineer Portfolio",
  description: "Portfolio content dashboard for projects and work experience.",
};

export default async function DashboardPage() {
  const authenticated = await isDashboardAuthenticated();

  if (!authenticated) {
    return <DashboardLogin />;
  }

  return <PortfolioDashboard />;
}
