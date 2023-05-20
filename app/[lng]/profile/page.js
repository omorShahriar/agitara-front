import qs from "qs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TypographyH1, TypographyMuted } from "@/components/Typography";

import CollectionList from "@/components/profile/CollectionList";
import { ProfileCollectionProvider } from "@/components/contexts/JotaiProviders";
export const revalidate = 0;
const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const getProfileData = async ({ jwt, locale = "en" }) => {
  const query = qs.stringify(
    {
      populate: {
        infos: {
          fields: [, "title", "slug"],
        },
        docs: {
          fields: [, "title", "slug"],
        },
        projects: {
          fields: [, "title", "slug"],
        },
      },
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${strapiUrl}/api/users/me?${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();
  return data;
};
const page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getProfileData({ jwt: session.jwt });

  return (
    <div className="container mt-12">
      <TypographyH1>Account Information</TypographyH1>
      <div className="mt-3">
        <div className="flex gap-x-1 items-end">
          {" "}
          User Name: <TypographyMuted>{session.user.name}</TypographyMuted>{" "}
        </div>
        <div className="flex gap-x-1 items-end">
          Email: <TypographyMuted>{session.user.email}</TypographyMuted>{" "}
        </div>
      </div>
      <div className="mt-6">
        <ProfileCollectionProvider>
          <>
            <CollectionList
              collectionName="infos"
              serverCollection={data.infos}
              jwt={session.jwt}
            />
          </>
        </ProfileCollectionProvider>
        <ProfileCollectionProvider>
          <CollectionList
            collectionName="documents"
            serverCollection={data.docs}
            jwt={session.jwt}
          />
        </ProfileCollectionProvider>
        <ProfileCollectionProvider>
          <CollectionList
            collectionName="projects"
            serverCollection={data.projects}
            jwt={session.jwt}
          />
        </ProfileCollectionProvider>
      </div>
    </div>
  );
};

export default page;
