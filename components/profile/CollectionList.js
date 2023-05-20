"use client";

import CollectionEntry from "./CollectionEntry";

import { TypographyH3 } from "../Typography";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export const likedCollectionAtom = atom([]);
const CollectionList = ({ serverCollection, collectionName, jwt }) => {
  useHydrateAtoms([[likedCollectionAtom, serverCollection]]);
  const [likedCollection] = useAtom(likedCollectionAtom);

  return (
    <div className="mb-6">
      {likedCollection.length != 0 && (
        <TypographyH3>Liked {collectionName}</TypographyH3>
      )}
      <div className="grid grid-cols-12 gap-2 mt-3">
        {likedCollection.map((collectionEntry) => (
          <CollectionEntry
            key={collectionEntry.id}
            collection={collectionEntry}
            name={collectionName}
            jwt={jwt}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionList;
