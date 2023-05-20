export const LikeBoxSkeleton = () => {
  return (
    <div className=" w-[47px] h-6 animate-pulse  rounded-md flex gap-x-2 ">
      <div className="bg-gray-500 flex-1  rounded-md" />
      <div className="bg-gray-500 w-2 h-full rounded-md " />
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-8 my-12 mx-8">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="col-span-2 md:col-span-1  h-[155px] animate-pulse  rounded-md  bg-gray-300"
        />
      ))}
    </div>
  );
};

export const CollectionSkeleton = () => {
  return (
    <div className=" container ">
      <div className="w-full h-[72px] rounded-md animate-pulse   bg-gray-300" />
      <CardSkeleton />
    </div>
  );
};
