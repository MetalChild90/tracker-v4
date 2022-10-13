import { getCoin } from "../AppActions";
import calculatePercent from "./calculatePercent";

interface WatchedCoinsInterface {
  id: string | undefined;
  priceTarget: number | undefined;
}

interface CoinInterface {
  id: string | undefined;
  name?: string | undefined;
  price?: number | undefined;
  current_price?: number;
  priceTarget?: number | undefined;
  ath?: number | undefined;
  distancePercent?: number | undefined;
}

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
