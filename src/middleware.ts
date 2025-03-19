import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest, NextResponse } from "next/server";
import { RESTRICTED_COUNTRIES_CODE } from "./data/restrictedCountries";
import { getIpUrl } from "./utils/helpers";

const rateLimiter = new RateLimiterMemory({
  points: 10, // Allow 10 requests
  duration: 1, // Per second
});

const ACCESS_KEY = process.env.IPSTACK_ACCESS_KEY as string;
// Set the cookie with an expiry of 2 days (in seconds)
const MAX_AGE = 2 * 24 * 60 * 60;

async function handleRateLimit(ip: string) {
  try {
    await rateLimiter.consume(ip); // Track IP requests
    return NextResponse.next();
  } catch {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
}

function generateCSPHeader(nonce: string): string {
  return `
    default-src 'self';
    connect-src 'self' https://*.alchemy.com https://*.infura.io/ https://api-testnet.layerzero-scan.com/ https://www.google-analytics.com/ https://api.ipstack.com/ https://leaderboard-api-422055794768.us-central1.run.app/;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
    style-src 'self' 'nonce-${nonce}' https://fonts.cdnfonts.com;
    img-src 'self' blob: data:;
    font-src 'self' https://fonts.cdnfonts.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();
}

function applyCSP(request: NextRequest, nonce: string) {
  const cspHeader = generateCSPHeader(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);
  return response;
}

async function handleGeoRestriction(
  request: NextRequest,
  response: NextResponse
) {
  const countryCookie = request.cookies.get("client-ip-country")?.value;

  if (countryCookie) {
    const isRestricted = RESTRICTED_COUNTRIES_CODE.includes(countryCookie);
    if (isRestricted && !request.nextUrl.pathname.startsWith("/restricted")) {
      return NextResponse.redirect(new URL("/restricted", request.url));
    }
  } else {
    let ipAddress =
      request.headers.get("x-forwarded-for") || request.ip || "Unknown IP";
    if (ipAddress.includes(",")) {
      ipAddress = ipAddress.split(",")[0].trim();
    }

    try {
      const geoRes = await fetch(getIpUrl(ipAddress, ACCESS_KEY));
      const geoData = await geoRes.json();

      const isRestricted = RESTRICTED_COUNTRIES_CODE.includes(
        geoData.country_code
      );

      if (isRestricted && !request.nextUrl.pathname.startsWith("/restricted")) {
        return NextResponse.redirect(new URL("/restricted", request.url));
      }

      response.cookies.set("client-ip-country", geoData.country_code, {
        path: "/",
        expires: MAX_AGE,
      });
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
      return NextResponse.redirect(new URL("/markets", request.url));
    }
  }
  return null; // No geo-restriction redirect needed
}

function handleRootRedirect(request: NextRequest, isRestricted: boolean) {
  if (!isRestricted && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/markets", request.url));
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";

  const rateLimitResponse = handleRateLimit(ip);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  let response = applyCSP(request, nonce);

  const geoRestrictionResponse = await handleGeoRestriction(request, response);
  if (geoRestrictionResponse) {
    return geoRestrictionResponse;
  }
  const countryCookie = request.cookies.get("client-ip-country")?.value;
  const isRestricted = countryCookie
    ? RESTRICTED_COUNTRIES_CODE.includes(countryCookie)
    : false;

  const redirectResponse = handleRootRedirect(request, isRestricted);
  if (redirectResponse) {
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    "/", // Explicitly match the root "/"
  ],
};
