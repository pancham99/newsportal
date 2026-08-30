// export async function getNews(slug){

//  const res = await fetch(`http://localhost:5000/api/news/details/${slug}`,{
//    next:{revalidate:60}
//  })

//  return res.json()

// }

import { base_api_url } from "../config/config";

export async function getNews(slug) {
  try {
    const res = await fetch(
      `${base_api_url}/api/news/details/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(
        "News API failed:",
        res.status,
        res.statusText
      );

      return {
        news: null,
        relatedNews: [],
      };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching news:", error);

    return {
      news: null,
      relatedNews: [],
    };
  }
}