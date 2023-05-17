"use client";
import { Fragment } from "react";
import CollectionCard from "./CollectionCard";
import { useSession } from "next-auth/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMoreCollections } from "@/datalayer/api";
import { Button } from "@/components/ui/button";
import { CardSkeleton } from "../ui/skeletons";
import { useAtomValue } from "jotai";
import { searchFormAtom, selectedCategoriesAtom } from "@/app/store";
const CollectionGrid = ({ collectionName, serverCollection }) => {
  const { data: session } = useSession();
  const selectedCategories = useAtomValue(selectedCategoriesAtom);
  const searchForm = useAtomValue(searchFormAtom);
  const {
    data: queryData,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [collectionName, selectedCategories, searchForm],
    queryFn: ({ pageParam = 1, queryKey }) =>
      getMoreCollections({ queryKey, pageParam }),
    initialData: serverCollection,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    getNextPageParam: (page) =>
      page.current_page === page.total_page ? undefined : page.current_page + 1,
  });

  const notFound = queryData.pages[0].data.length == 0;
  return (
    <div>
      {" "}
      {isLoading || isFetching ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-8 my-12 mx-8">
          {isSuccess &&
            queryData.pages.map((page) => (
              <Fragment key={page.id}>
                {page.data.map((info) => (
                  <CollectionCard
                    key={info.id}
                    data={info}
                    session={session}
                    collectionName={collectionName}
                  />
                ))}
              </Fragment>
            ))}
        </div>
      )}
      {isFetchingNextPage && <CardSkeleton />}
      <div className=" flex items-center justify-center">
        {!hasNextPage && !isLoading ? (
          <p className="text-xl font-medium">
            {notFound
              ? `Sorry couldn't find anything.`
              : ` Congrats! you have reached the end of the ${collectionName}`}
          </p>
        ) : (
          <Button onClick={fetchNextPage}>
            {isFetchingNextPage ? "Loading more" : "Load more"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CollectionGrid;
