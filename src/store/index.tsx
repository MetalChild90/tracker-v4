import { configureStore } from "@reduxjs/toolkit";

import coinsReducer from "./coins";
import layoutReducer from "./layout";
import paginationReducer from "./pagination";

const store = configureStore({
  reducer: {
    coins: coinsReducer,
    pagination: paginationReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
