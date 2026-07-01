import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const dashboardSessionCookieName = "portfolio_dashboard_session";

const dashboardEmail = "muhammaddhani494@gmail.com";
const dashboardPasswordHash =
  "e81fab920d035809051f45df0cefdce12ddb357035a932c1612011bf4c78de84";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function getDashboardSessionValue() {
  return sha256(
    `${dashboardEmail}:${dashboardPasswordHash}:portfolio-dashboard-v1`,
  );
}

export function verifyDashboardCredentials(email: unknown, password: unknown) {
  if (typeof email !== "string" || typeof password !== "string") {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = sha256(password);

  return (
    safeCompare(normalizedEmail, dashboardEmail) &&
    safeCompare(passwordHash, dashboardPasswordHash)
  );
}

export function isValidDashboardSession(value: string | undefined) {
  if (!value) {
    return false;
  }

  return safeCompare(value, getDashboardSessionValue());
}

export async function isDashboardAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(dashboardSessionCookieName);

  return isValidDashboardSession(session?.value);
}
