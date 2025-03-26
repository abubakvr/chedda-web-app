import { NextRequest, NextResponse } from "next/server";
import { RESTRICTED_COUNTRIES_CODE } from "./data/restrictedCountries";
import { getIpUrl } from "./utils/helpers";

const ACCESS_KEY = process.env.IPSTACK_ACCESS_KEY as string;
// Set the cookie with an expiry of 2 days (in seconds)
const MAX_AGE = 2 * 24 * 60 * 60;

export async function middleware(request: NextRequest) {
  // Generate a nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Define the CSP policy with nonce
  const cspHeader = `
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
    .trim(); // Clean up extra spaces and newlines

  // Prepare request headers and add nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  // Create a response object with the modified headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);

  // Check for a cookie that stores the user's country
  const countryCookie = request.cookies.get("client-ip-country")?.value;
  if (countryCookie) {
    const isRestricted = RESTRICTED_COUNTRIES_CODE.includes(countryCookie);
    // Redirect if the user is from a restricted country and not already on /restricted
    if (isRestricted && !request.nextUrl.pathname.startsWith("/restricted")) {
      return NextResponse.redirect(new URL("/restricted", request.url));
    }
  }

  // If no cookie, extract IP address
  let ipAddress =
    request.headers.get("x-forwarded-for") || request.ip || "Unknown IP";
  if (ipAddress.includes(",")) {
    ipAddress = ipAddress.split(",")[0].trim(); // Handle multiple IPs in case of proxies
  }

  try {
    // Fetch geolocation data from IP
    const geoRes = await fetch(getIpUrl(ipAddress, ACCESS_KEY));
    const geoData = await geoRes.json();

    const isRestricted = RESTRICTED_COUNTRIES_CODE.includes(
      geoData.country_code
    );
    // Redirect to /restricted if the country is restricted
    if (isRestricted && !request.nextUrl.pathname.startsWith("/restricted")) {
      return NextResponse.redirect(new URL("/restricted", request.url));
    }

    // Set a cookie to store the user's country for future requests
    response.cookies.set("client-ip-country", geoData.country_code, {
      path: "/",
      expires: MAX_AGE,
    });

    // Redirect '/' to '/markets'
    if (!isRestricted && request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/markets", request.url));
    }
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return NextResponse.redirect(new URL("/markets", request.url));
    // Todo: Handle the error gracefully, perhaps by logging it or displaying a message to the user
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
