// export async function getNews(slug){

//  const res = await fetch(`http://localhost:5000/api/news/details/${slug}`,{
//    next:{revalidate:60}
//  })

//  return res.json()

// }

import { base_api_url } from "../config/config";

export async function getNews(slug) {
  try {
    const res = await fetch(`http://localhost:5000/api/news/details/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return { news: null, relatedNews: [] };
  }
}