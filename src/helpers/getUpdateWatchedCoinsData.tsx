import { getCoin } from "../store/coinsService";
import calculatePercent from "./calculatePercent";
import { WatchedCoinsInterface } from "../Interfaces";

const getUpdateWatchedCoinsData = async (
  watchedCoins: WatchedCoinsInterface[] | undefined
) => {
  return await Promise.all(
    watchedCoins!.map(async (coin) => {
      const fetchedCoin = await getCoin(coin.id!);
      const distancePercent = calculatePercent(
        fetchedCoin!.price!,
        coin.priceTarget!
      );
      return { ...coin, ...fetchedCoin, distancePercent };
    })
  );
};

export default getUpdateWatchedCoinsData;
