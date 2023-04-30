import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  name: string;
  price: string;
  monthRet: string;
}

const initialState: CounterState[] = [];
export const counterSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<CounterState[]>) => {
      state = action.payload;
      return state;
    },
    updatePrice: (
      state,
      action: PayloadAction<{ name: string; price: string }>
    ) => {
      let newState: CounterState[] = [];
      for (let index = 0; index < state.length; index++) {
        const element = state[index];

        if (element?.name === action.payload.name) {
          newState.push({
            name: element.name,
            price: action.payload.price,
            monthRet: element.monthRet,
          });
        } else {
          newState = [...newState, element];
        }
      }
      console.log(action.payload);
      state.map((coin) => {
        if (coin.name === action.payload.name) {
          return { ...coin, price: action.payload.price };
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCoins, updatePrice } = counterSlice.actions;

export default counterSlice.reducer;
