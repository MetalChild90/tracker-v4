import { WatchedCoinsInterface } from "../Interfaces";

const isTokenWatched = (
  watchedCoins: WatchedCoinsInterface[] | undefined,
  id: string
) => {
  const result = watchedCoins!.filter((coin) => coin.id === id);
  return result.length > 0 ? true : false;
};

export default isTokenWatched;
