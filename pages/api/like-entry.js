import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { entryId, like, collectionName } = req.body;
  if (session) {
    // Signed in

    try {
      if (like) {
        const data = await fetch(
          `${strapiUrl}/api/${collectionName}s/${entryId}/like`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${session.jwt}`,
            },
          }
        );
        console.log(data);
      } else {
        await fetch(`${strapiUrl}/api/${collectionName}s/${entryId}/unlike`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        });
      }

      res.status(200);
    } catch (error) {
      console.error(error);
      res.status(400);
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
