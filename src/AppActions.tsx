import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

interface CoinInterface {
  id: string | undefined;
  name?: string | undefined;
  price?: number | undefined;
  current_price?: number;
  priceTarget?: number | undefined;
  ath?: number | undefined;
  distancePercent?: number | undefined;
}

export const getCoins = async (currentPage: number) => {
  try {
    const res =
      await axios.get(`${BASE_URL}/coins/markets?vs_currency=usd&order=id_asc&per_page=100&page=${currentPage}&sparkline=false
            `);

    const result = res.data.map(
      ({ id, name, current_price, ath }: CoinInterface) => ({
        id,
        name,
        current_price,
        ath,
      })
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCoins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/coins/list`);
    const filteredAllCoins = res.data.map(({ id, name }: CoinInterface) => ({
      id,
      name,
    }));
    return filteredAllCoins;
  } catch (err) {
    console.log(err);
  }
};

export const getCoin = async (id: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    let result: CoinInterface = (({ id, name }) => ({
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
