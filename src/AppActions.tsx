import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getCoins = async (currentPage) => {
  try {
    const res =
      await axios.get(`${BASE_URL}/coins/markets?vs_currency=usd&order=id_asc&per_page=100&page=${currentPage}&sparkline=false
            `);

    const result = res.data.map(({ id, name, current_price, ath }) => ({
      id,
      name,
      current_price,
      ath,
    }));
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCoins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/coins/list`);
    const filteredAllCoins = res.data.map(({ id, name }) => ({
      id,
      name,
    }));
    console.log(filteredAllCoins);
    return filteredAllCoins;
  } catch (err) {
    console.log(err);
  }
};

export const getCoin = async (id) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    let result = (({ id, name }) => ({
      id,
      name,
    }))(res.data);
    const price = res.data.market_data.current_price.usd;
    result.price = price;
    return result;
  } catch (err) {
    console.log(err);
  }
};
