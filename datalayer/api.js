import qs from "qs";
import { nanoid } from "nanoid";
const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export const getHomePageData = async ({ locale = "en" }) => {
  const query = qs.stringify(
    {
      populate: {
        carouselBlock: {
          populate: ["slides.image"],
        },
        heroBlock: {
          populate: ["ctas", "heroImage"],
        },
        faqBlock: { populate: ["qaBlock"] },
        serviceBlock: {
          populate: ["cards.Icon"],
        },
        infoBlock: {
          populate: ["headingBlock", "ctas"],
        },
        featureBlock: {
          populate: ["headingBlock", "cards.Icon"],
        },
        SEO: {
          populate: ["additionalTags"],
        },
      },
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/home-page?${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data?.attributes ?? null;
};
export const getCollectionCategories = async ({
  locale = "en",
  collectionName,
} = {}) => {
  const query = qs.stringify(
    {
      fields: ["name"],
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/${collectionName}-categories?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const resp = await res.json();
  return resp.data.map((d) => d.attributes.name);
};

export const getCollections = async ({
  page = 1,
  pageSize = 2,
  locale = "en",
  collectionName,
} = {}) => {
  const query = qs.stringify(
    {
      fields: ["date", "title", "author", "slug"],
      populate: {
        category: {
          fields: ["name"],
        },
        likedBy: {
          fields: ["email"],
        },
      },
      pagination: {
        page,
        pageSize,
      },
      locale,
    },

    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/${collectionName}s?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { data: collectionResp } = await res.json();

  const collectionData = {
    id: nanoid(),
    data:
      collectionResp?.attributes?.results.map((result) => ({
        ...result,
        likedBy: result.likedBy.map((liker) => liker.email),
      })) || [],

    current_page: collectionResp?.attributes?.pagination.page,
    total_page: collectionResp?.attributes?.pagination.pageCount,
  };
  return {
    pages: [collectionData],
    pageParams: [null],
  };
};

export const getCollection = async ({
  locale = "en",
  slug,
  collectionName,
} = {}) => {
  const query = qs.stringify(
    {
      populate: {
        category: {
          fields: ["name"],
        },
        likedBy: {
          fields: ["email"],
        },
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/${collectionName}s?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const { data } = await res.json();
  let collectionData = data?.attributes?.results[0] || null;
  if (collectionData) {
    collectionData = {
      ...collectionData,
      likedBy: collectionData.likedBy.map((liker) => liker.email),
    };
  }
  return collectionData;
};

export const getMoreCollections = async ({
  locale = "en",
  pageParam = "1",
  queryKey = ["", [], ""],
} = {}) => {
  const [collectionName, categoryFilters, searchText] = queryKey;
  const strapiQuery = {
    fields: ["date", "title", "author", "slug"],
    populate: {
      category: {
        fields: ["name"],
      },
      likedBy: {
        fields: ["email"],
      },
    },
    sort: ["date:desc"],
    filters: {},
    locale,
    pagination: {
      page: pageParam,
      pageSize: 4,
    },
  };

  //Add Nested Inclusion Query Filters
  if (categoryFilters && categoryFilters.length)
    strapiQuery["filters"]["category"] = {
      name: { $in: categoryFilters },
    };

  // Add Full Text Search Query
  if (searchText) {
    const searchFields = [
      "title",
      "details",
      // deep nested search fields
      "category.name",
    ];

    strapiQuery["filters"]["$or"] = searchFields.map((field) => {
      const searchField = {};
      if (!field.includes(".")) {
        searchField[field] = { $containsi: searchText };
      } else {
        const [level1, level2] = field.split(".");
        const nestedSearchField = {};
        nestedSearchField[level2] = { $containsi: searchText };
        searchField[level1] = nestedSearchField;
      }
      return searchField;
    });
  }

  const strapiQueryStr = qs.stringify(strapiQuery, { encodeValuesOnly: true });
  const res = await fetch(
    `${strapiUrl}/api/${collectionName}s?${strapiQueryStr}`
  );
  const { data: collectionResp } = await res.json();

  if (collectionResp.attributes.results.length == 0) {
    const collectionData = {
      id: nanoid(),
      data: [],
      current_page: 1,
      total_page: 1,
    };
    return collectionData;
  }
  const collectionData = {
    id: nanoid(),
    data:
      collectionResp?.attributes?.results.map((result) => ({
        ...result,
        likedBy: result.likedBy.map((liker) => liker.email),
      })) || [],

    current_page: collectionResp?.attributes?.pagination.page,
    total_page: collectionResp?.attributes?.pagination.pageCount,
  };
  return collectionData;
};
