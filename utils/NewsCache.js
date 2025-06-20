// utils/NewsCache.js
let cachedNews = null;

export const getCachedNews = () => cachedNews;
export const setCachedNews = (news) => {
  cachedNews = news;
};
