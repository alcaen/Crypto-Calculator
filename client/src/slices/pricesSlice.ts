import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TReturn } from "src/types/prices.types";

// Store of the calculator empty at the beggining
const initialState: TReturn[] = [];
export const counterSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    // set coins to the fetched ones
    setCoins: (state, action: PayloadAction<TReturn[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCoins } = counterSlice.actions;

export default counterSlice.reducer;
