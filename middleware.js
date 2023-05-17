import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";
import { withAuth } from "next-auth/middleware";
acceptLanguage.languages(languages);

const cookieName = "i18next";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    let lng;
    if (req.cookies.has(cookieName))
      lng = acceptLanguage.get(req.cookies.get(cookieName).value);
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL(`/${lng}`, req.url));
    }

    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer"));
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return !/(en|de)\/profile/.test(req.nextUrl.pathname) || token;
      },
    },
  }
);
