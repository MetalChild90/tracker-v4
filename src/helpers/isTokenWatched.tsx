const isTokenWatched = (watchedCoins, id) => {
  const result = watchedCoins.filter((coin) => coin.id === id);
  return result.length > 0 ? true : false;
};

export default isTokenWatched;
