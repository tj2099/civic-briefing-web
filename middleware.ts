import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// All the mockup's internal "screens" — keep in sync with the goTo() calls in
// mockup_overhaul.html. The mockup JS reads location.pathname on load and shows
// the matching screen, and uses history.pushState to update the URL on every
// in-page navigation so Vercel Analytics records each section as its own view.
export function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL("/mockup_overhaul.html", request.url));
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/sample",
    "/past-issues",
    "/districts",
    "/housing",
    "/transit",
    "/climate",
    "/public-safety",
    "/arts",
    "/d1",
    "/d2",
    "/d3",
    "/d4",
    "/d5",
    "/d6",
    "/d7",
    "/d8",
    "/d9",
    "/d10",
    "/d11",
    "/contact",
  ],
};
