import FilterPanel from "@/components/shared/FilterPanel";
import CollectionGrid from "./CollectionGrid";
import { getCollections, getCollectionCategories } from "@/datalayer/api";
import { JotaiCollectionProvider } from "../contexts/JotaiProviders";

const CollectionShell = async ({ collectionName }) => {
  const [serverCollection, categories] = await Promise.all([
    getCollections({ collectionName }),
    getCollectionCategories({ collectionName }),
  ]);
  return (
    <JotaiCollectionProvider>
      {" "}
      <div className="mb-12">
        <FilterPanel
          categories={categories}
          searchPlaceholder={`Search ${collectionName}`}
        />
        <CollectionGrid
          collectionName={collectionName}
          serverCollection={serverCollection}
        />
      </div>
    </JotaiCollectionProvider>
  );
};

export default CollectionShell;
