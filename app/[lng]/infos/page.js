import Header from "@/components/Header";
import CollectionShell from "@/components/shared/CollectionShell";
import Container from "@/components/layout/Container";

export const revalidate = 60;

const page = async () => {
  const collectionName = "info";

  return (
    <div>
      <Container>
        <Header>{`${collectionName}s`}</Header>

        <CollectionShell collectionName={collectionName} />
      </Container>
    </div>
  );
};

export default page;
