import { headers } from "next/headers";
import AuthContext from "@/components/contexts/AuthContext";
import { dir } from "i18next";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import qs from "qs";
import { notFound } from "next/navigation";
const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
export const revalidate = 300;
async function getSession(cookie) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}
const getNavigationData = async (locale = "en") => {
  const query = qs.stringify(
    {
      populate: "deep",
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/main-menu?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { data } = await res.json();
  return data?.attributes?.body;
};

const getFooterData = async (locale = "en") => {
  const query = qs.stringify(
    {
      populate: {
        sections: {
          populate: {
            links: "t",
          },
        },
        socialLinks: "t",
      },
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/footer?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { data } = await res.json();
  return data?.attributes ?? null;
};

export const metadata = {
  title: {
    default: "Agitara",
    template: "%s | Agitara",
  },
  description:
    "agitara,  a company and brand for breath-taking innovative products.",
};

export default async function Layout({ children, params: { lng } }) {
  if (!/(en|de)/.test(lng)) {
    notFound();
  }
  const serverCookie = headers().get("cookie");
  const [session, navElementsData, footerData] = await Promise.all([
    getSession(serverCookie ?? ""),
    getNavigationData(lng),
    getFooterData(lng),
  ]);
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />

      <body className=" font-sans ">
        <AuthContext session={session}>
          <ClientProviders>
            {" "}
            <header className=" sticky top-0 z-50 bg-white dark:bg-zinc-900 ">
              <Navigation
                lang={lng}
                session={session}
                navElementsData={navElementsData}
              />
            </header>
            <main className=" flex-1 "> {children}</main>
            <Footer lang={lng} footerData={footerData} />
          </ClientProviders>
        </AuthContext>
      </body>
    </html>
  );
}
