import qs from "qs";

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export async function fetcher(url, options = {}) {
  let response;
  if (!options) {
    response = await fetch(url);
  } else {
    response = await fetch(url, options);
  }
  const data = await response.json();
  return data;
}

//for main layout
export const getSiteInfo = async (locale) => {
  const query = qs.stringify(
    {
      populate: ["logo"],
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/site-info?${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const {
    data: { attributes },
  } = await res.json();
  return attributes;
};
export const getNavigationData = async (locale) => {
  const query = qs.stringify(
    {
      populate: "deep",
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/main-menu?${query}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { data } = await res.json();
  return data?.attributes?.body;
};

export const getFooterData = async (locale) => {
  const query = qs.stringify(
    {
      populate: {
        sections: {
          populate: {
            links: "t",
          },
        },
        socialLinks: "t",
      },
      locale,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/footer?${query}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { data } = await res.json();
  return data?.attributes ?? null;
};

// Home Page
export const getHomePageData = async (locale) => {
  const query = qs.stringify(
    {
      populate: {
        hero_slider: {
          populate: "slides.image",
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

export const getRecentArticles = async (locale = "en") => {
  const query = qs.stringify(
    {
      populate: ["media"],
      pagination: {
        limit: 8,
      },
      sort: ["createdAt:desc"],
      locale,
    },

    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/articles?${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getRecentProducts = async (locale = "en") => {
  const query = qs.stringify(
    {
      populate: ["media", "category"],
      pagination: {
        limit: 8,
      },
      sort: ["createdAt:desc"],
      locale,
    },

    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/products?${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

// articles page
export const getArticles = async ({
  page = 0,
  pageSize = 12,
  locale = "en",
} = {}) => {
  const query = qs.stringify(
    {
      populate: ["media"],
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
  const url = `${strapiUrl}/api/articles?${query}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getArticleBySlug = async (locale = "en", slug) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: ["media"],
        locale,
      },

      {
        encodeValuesOnly: true,
      }
    );
    const url = `${strapiUrl}/api/articles?${query}`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    const articleData = await res.json();
    if (articleData.data.length == 0) {
      return null;
    }
    const { attributes } = articleData?.data[0];

    return attributes;
  } catch (error) {
    console.log("there was an error", error);
  }
};

// categories page
export const getCategories = async (lang = "en") => {
  const query = qs.stringify(
    {
      locale: lang,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/categories?${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { data } = await res.json();
  return data;
};
export const getCategoryBySlug = async (lang = "en", slug) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: {
          products: {
            populate: {
              media: "t",
              category: {
                populate: "t",
                fields: ["name"],
              },
            },
          },
        },
        locale: lang,
      },

      {
        encodeValuesOnly: true,
      }
    );
    const url = `${strapiUrl}/api/categories?${query}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    const categoryData = await res.json();
    if (categoryData.data.length == 0) {
      return null;
    }
    const { attributes } = categoryData?.data[0];

    return attributes;
  } catch (error) {
    console.log("There was an error", error);
  }
};

// products page
export const getProducts = async ({
  page = 0,
  pageSize = 12,
  locale = "en",
} = {}) => {
  const query = qs.stringify(
    {
      populate: ["media", "category"],
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
  const url = `${strapiUrl}/api/products?${query}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getProductBySlug = async (lang = "en", slug) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        media: "t",
        category: "t",
        specification: {
          populate: ["attributes"],
        },
      },
      locale: lang,
    },

    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/products?${query}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const productData = await res.json();
  if (productData.data.length == 0) {
    return null;
  }
  const { attributes } = productData?.data[0];

  return attributes;
};
// pages
export const getPages = async () => {
  const url = `${strapiUrl}/api/pages?`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const getPageData = async (lang = "en", slug) => {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["blocks"],
      locale: lang,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/pages/?${query}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error("fetch failed");
  }

  const pageData = await res.json();
  if (pageData.data.length == 0) {
    return null;
  }
  const { attributes } = pageData?.data[0];

  return attributes;
};

// search page
export const getproductSearchResult = async (q, lang = "en") => {
  const query = qs.stringify(
    {
      populate: ["category", "media"],
      filters: {
        $or: [
          {
            title: {
              $containsi: q,
            },
          },
          {
            description: {
              $containsi: q,
            },
          },
          {
            category: {
              name: {
                $containsi: q,
              },
            },
          },
        ],
      },
      locale: lang,
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${strapiUrl}/api/products?${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const { data } = await res.json();
  return data;
};
