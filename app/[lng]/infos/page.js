import Header from "@/components/Header";
import CollectionShell from "@/components/shared/CollectionShell";
import Container from "@/components/layout/Container";
import { Suspense } from "react";
import { CollectionSkeleton } from "@/components/ui/skeletons";

export const revalidate = 0;

const page = async () => {
  const collectionName = "info";

  return (
    <div>
      <Container>
        <Header>{`${collectionName}s`}</Header>
        <Suspense fallback={<CollectionSkeleton />}>
          {" "}
          <CollectionShell collectionName={collectionName} />
        </Suspense>
      </Container>
    </div>
  );
};

export default page;
