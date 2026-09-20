const NEWSDATA_API_URL = "https://newsdata.io/api/1/latest";

async function getHindiNews() {
  const apiKey = process.env.NEWSDATA_API_KEY;

  if (!apiKey) {
    return {
      articles: [],
      error: "NEWSDATA_API_KEY is not configured.",
    };
  }

  try {
    const params = new URLSearchParams({
      apikey: apiKey,
      q: "hindi news",
      language: "hi",
      full_content: "1",
      timezone: "Asia/Kolkata",
    });
    const response = await fetch(`${NEWSDATA_API_URL}?${params}`, {
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok || data?.status === "error") {
      return {
        articles: [],
        error: data?.results?.message || data?.message || `API request failed (${response.status}).`,
      };
    }

    return {
      articles: Array.isArray(data?.results) ? data.results : [],
      error: null,
    };
  } catch (error) {
    return {
      articles: [],
      error: error instanceof Error ? error.message : "Unable to fetch Hindi news.",
    };
  }
}

export default async function NewsDataHindiTest() {
  const { articles, error } = await getHindiNews();

  return (
    <section className="mx-auto max-w-5xl space-y-5 p-4 md:p-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          NewsData.io test
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">हिंदी न्यूज़ टेस्ट</h1>
        <p className="mt-2 text-slate-600">Search query: hindi news</p>
      </header>

      {error ? (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      ) : articles.length === 0 ? (
        <p className="rounded border border-slate-200 bg-white p-4 text-slate-600">
          कोई खबर नहीं मिली।
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article, index) => (
            <article
              className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm"
              key={article.article_id || article.link || index}
            >
              {article.image_url && (
                <img
                  alt={article.title || "Hindi news"}
                  className="h-48 w-full object-cover"
                  src={article.image_url}
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-slate-900">{article.title}</h2>
                {(article.content || article.description) && (
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <p className="text-sm leading-6 text-slate-700">
                      {article.content || article.description}
                    </p>
                    {!article.content && (
                      <p className="mt-2 text-xs text-amber-700">
                        पूरा लेख उपलब्ध नहीं है। NewsData.io full-content access की आवश्यकता है।
                      </p>
                    )}
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                  <span>{article.source_name || "अज्ञात स्रोत"}</span>
                  <time dateTime={article.pubDate || undefined}>
                    {article.pubDate || "समय उपलब्ध नहीं"}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
