export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const API_KEY = "17EYNFSWJDGQ4XDC"; // Replace with your real key

  if (!symbol) {
    return Response.json({ error: "Symbol is required" }, { status: 400 });
  }

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    // Alpha Vantage free-tier rate limit notice
    if (data.Note) {
      return Response.json({ error: "API limit reached. Try again later." }, { status: 429 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
