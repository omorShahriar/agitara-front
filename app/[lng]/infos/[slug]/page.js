import TopPanel from "@/components/ui/TopPanel";
import Container from "@/components/layout/Container";
import BackLink from "@/components/shared/BackLink";
import LikeEntry from "@/components/shared/LikeEntry";
import { getCollection } from "@/datalayer/api";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const revalidate = 0;
const collectionName = "info";

const page = async ({ params }) => {
  const { slug, lng } = params;
  const session = await getServerSession(authOptions);
  const data = await getCollection({ lng, slug, collectionName });

  return (
    <Container>
      <TopPanel>
        <BackLink>{`back to all ${collectionName}s`}</BackLink>
        <div>
          <LikeEntry
            entryId={data.id}
            serverLikes={data.likedBy}
            session={session}
            collectionName={collectionName}
          />
        </div>
      </TopPanel>
      <div className="md:prose-xl prose mx-auto my-12">
        {" "}
        <h1 className="text-3xl font-bold mt-12 ">{data.title}</h1>
        <div className="my-8 flex justify-between gap-x-2 font-medium">
          <p className="">{formatDate(data.date)}</p>
          <p className="">
            Author:{" "}
            <span className=" italic text-sm capitalize ">{data.author}</span>
          </p>
        </div>
        <article className=" mb-12 ">{data.details}</article>
      </div>
    </Container>
  );
};

export default page;
