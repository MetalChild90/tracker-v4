import { getCoin } from "../AppActions";
import calculatePercent from "./calculatePercent";

const getUpdateWatchedCoinsData = async (watchedCoins) => {
  return await Promise.all(
    watchedCoins.map(async (coin) => {
      const fetchedCoin = await getCoin(coin.id);
      const distancePercent = calculatePercent(
        fetchedCoin.price,
        coin.priceTarget
      );
      return { ...coin, ...fetchedCoin, distancePercent };
    })
  );
};

export default getUpdateWatchedCoinsData;
