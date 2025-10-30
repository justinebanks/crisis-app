
export async function getNewsDataArticles(queryParams) {
    const params = new URLSearchParams({
        ...queryParams,
        api_key: process.env.NEWS_DATA_API_KEY,
    });

    const response = await fetch(`https://newsdata.io/api/1/latest?${params.toString()}`);
    const data = await response.json();
    return data;
}