"use client";

import Link from "next/link";
import { useLang } from "../contexts/LangContext";
import { Trash, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAtom, useSetAtom, atom } from "jotai";
import { likedCollectionAtom } from "./CollectionList";
import { useState } from "react";
const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const CollectionEntry = ({ collection, name, jwt }) => {
  const lang = useLang();
  const setLikedCollection = useSetAtom(likedCollectionAtom);
  const [loading, setLoading] = useState(false);
  const removeCollection = async (id, jwt) => {
    try {
      setLoading(true);
      await fetch(`${strapiUrl}/api/${name}/${id}/unlike`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) =>
        setLikedCollection((collection) => collection.filter((c) => c.id != id))
      );
    } catch {
      console.error("something went wrong");
    }
    setLoading(false);
  };
  return (
    <div className="md:col-span-6 col-span-12 flex justify-between items-center border rounded-md p-2">
      <Link
        className="hover:underline"
        href={`/${lang}/${name}/${collection.slug}`}
      >
        {collection.title}
      </Link>
      <Button
        variant="ghost"
        disabled={loading}
        onClick={() => removeCollection(collection.id, jwt)}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Trash size={16} />
        )}
      </Button>
    </div>
  );
};

export default CollectionEntry;
