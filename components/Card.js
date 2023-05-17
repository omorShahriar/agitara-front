import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/media";

const generateUrl = (lang, slug, type) => {
  return type === "article"
    ? `/${lang}/articles/${slug}`
    : `/${lang}/products/${slug}`;
};

const Card = ({ lang = "en", info, cardType }) => {
  const { imageUrl } = getStrapiMedia(info.media);

  return (
    <Link
      href={generateUrl(lang, info.slug, cardType)}
      className=" block h-full "
    >
      {" "}
      <div className=" h-full max-w-[350px] flex flex-col overflow-hidden rounded-md shadow-md bg-theme-purple-light ">
        <div className="overflow-hidden p-2">
          <Image
            alt={info.title}
            src={imageUrl ?? "/placeholder.jpg"}
            width={400}
            height={250}
            className=" w-full h-60  object-cover object-center hover:scale-120 transition-all duration-500 "
          />
        </div>
        <div className=" p-4 flex-grow flex flex-col text-zinc-900">
          <h2
            title={info.title}
            className="mb-4 text-base md:text-xl font-bold line-clamp-1"
          >
            {info.title}
          </h2>
          <p className=" line-clamp-3 text-sm ">{info?.content}</p>
          {info?.date && (
            <div className="mt-8 self-end flex-grow flex flex-col">
              <p className="mt-auto">{info.date}</p>
            </div>
          )}
          {info.category?.data && (
            <div className="mt-6 flex justify-end">
              <p className="text-right text-sm md:text-base p-2 border-theme-blue-deep dark:border-zinc-700 border-2 border-spacing-2 max-w-fit rounded-md">
                {info.category.data.attributes.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export const ServiceCard = ({ children, iconUrl }) => {
  return (
    <div className="rounded-md md:shadow-lg shadow-md p-4 md:space-y-4 space-y-2 flex flex-col items-center">
      <Image src={iconUrl} alt="cardImage" width={200} height={200} />
      <p className=" text-center ">{children}</p>
    </div>
  );
};

export default Card;
