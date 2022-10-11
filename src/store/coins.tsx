import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CoinInterface {
  id: string;
  name: string;
  price: number;
  ath?: number;
}

interface WatchedCoinsInterface {
  id: string;
  priceTarget: number;
}

interface CoinsState {
  selectedCoin: CoinInterface | null;
  coins: CoinInterface[] | null;
  allCoins: string[];
  priceTarget: number;
  watchedCoins: WatchedCoinsInterface[] | null;
  loading: boolean;
  editMode: boolean;
}

const initialState: CoinsState = {
  selectedCoin: null,
  coins: [],
  allCoins: [],
  priceTarget: 0,
  watchedCoins: [],
  loading: true,
  editMode: false,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState: initialState,
  reducers: {
    getCoins(state, action: PayloadAction<CoinInterface[]>) {
      state.coins = action.payload;
      state.loading = false;
    },
    getAllCoins(state, action: PayloadAction<string[]>) {
      state.allCoins = action.payload;
      state.loading = false;
    },
    setSelectedCoin(state, action: PayloadAction<CoinInterface>) {
      state.selectedCoin = action.payload;
      state.loading = false;
    },
    removeSelectedCoin(state) {
      state.selectedCoin = null;
      state.priceTarget = 0;
    },
    setLoading(state) {
      state.loading = true;
    },
    cancelLoading(state) {
      state.loading = false;
    },
    addToWatchedList(state, action: PayloadAction<WatchedCoinsInterface[]>) {
      state.watchedCoins = action.payload;
      state.priceTarget = 0;
      state.selectedCoin = null;
    },
    deleteCoin(state, action: PayloadAction<WatchedCoinsInterface[]>) {
      state.watchedCoins = action.payload;
      state.selectedCoin = null;
    },
    openEditMode(state, action: PayloadAction<number>) {
      state.editMode = true;
      state.priceTarget = action.payload;
    },
    discardEdition(state) {
      state.editMode = false;
      state.selectedCoin = null;
      state.priceTarget = 0;
    },
    saveEdition(state, action: PayloadAction<WatchedCoinsInterface[]>) {
      state.watchedCoins = action.payload;
      state.editMode = false;
      state.selectedCoin = null;
      state.priceTarget = 0;
    },
  },
});

export const coinsActions = coinsSlice.actions;

export default coinsSlice.reducer;
