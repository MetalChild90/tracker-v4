export interface CoinInterface {
  id?: string;
  name?: string;
  price?: number;
  current_price?: number;
  priceTarget?: number;
  ath?: number;
  distancePercent?: number;
}

export interface WatchedCoinsInterface {
  id?: string;
  priceTarget?: number;
}
