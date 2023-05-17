"use client";

import Link from "next/link";
import { useLang } from "../contexts/LangContext";
import { formatDate } from "@/lib/utils";
import LikeEntry from "./LikeEntry";
const CollectionCard = ({ data, session, collectionName }) => {
  const lang = useLang();

  return (
    <div className="col-span-2 md:col-span-1 rounded-md shadow-sm hover:shadow-lg transition-all duration-300   p-4 flex flex-col">
      <div className="flex justify-between">
        <p className=" p-1  rounded border border-black max-w-fit h-fit">
          {data.category.name}
        </p>
        <LikeEntry
          serverLikes={data.likedBy}
          entryId={data.id}
          session={session}
          collectionName={collectionName}
        />
      </div>
      <Link
        className="text-2xl font-bold py-4 hover:text-emerald-700 transition-colors duration-300 "
        href={`/${lang}/${collectionName}s/${data.slug}`}
      >
        <h2>{data.title}</h2>
      </Link>
      <div className="flex justify-between">
        <p className="text-sm italic font-medium text-gray-700">
          {data.author}
        </p>
        <p className=" font-medium text-sm  ">{formatDate(data.date)}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
