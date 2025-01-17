const API_KEY = process.env.REACT_APP_STOCK_API_KEY_PROD; /* eslint-disable-line no-unused-vars */

const useFakeData = true;

export const searchStock = (stockTicker, onComplete) => {
  const url = useFakeData ? 'http://localhost:6002/search' : `https://finnhub.io/api/v1/search?q=${stockTicker}&token=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then(({ result }) => {
      if (!result) {
        onComplete([]);
        return;
      }
      const formattedResult = result.map((item) => ({
        name: item.description,
        symbol: item.symbol,
      }));
      onComplete(formattedResult);
    });
};

export const getStockPrice = (stockTicker, onComplete) => {
  const url = useFakeData ? `http://localhost:6002/price${Math.floor(Math.random() * 4)}` : `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then(({ c: currentPrice, h: high, l: low }) => {
      onComplete({
        currentPrice,
        high,
        low,
      });
    });
};

export const getStockNews = (stockTicker, onComplete) => {
  const url = useFakeData ? 'http://localhost:6002/news' : `https://finnhub.io/api/v1/company-news?symbol=${stockTicker}&from=2022-10-25&to=${new Date().toISOString().split('T')[0]}&token=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((newsArray) => {
      onComplete(newsArray);
    });
};
