import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  openModal: boolean;
}

const initialLayoutState: LayoutState = {
  openModal: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: initialLayoutState,
  reducers: {
    openModal(state) {
      state.openModal = !state.openModal;
    },
    closeModal(state) {
      state.openModal = !state.openModal;
    },
  },
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice.reducer;
