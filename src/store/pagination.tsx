import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  coinsPerPage: number;
  currentPage: number;
}

const initialPaginationState: PaginationState = {
  coinsPerPage: 100,
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState: initialPaginationState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const paginationActions = paginationSlice.actions;

export default paginationSlice.reducer;
