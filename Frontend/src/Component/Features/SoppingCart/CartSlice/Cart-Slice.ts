import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
};
export type CartItem = {
  id: any;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ id: any; name: string; price: number }>
    ) {
      const itemsIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemsIndex >= 0) {
        state.items[itemsIndex].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removefromCart(state, action: PayloadAction<string>) {
      const itemsIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (state.items[itemsIndex].quantity === 1) {
        state.items.splice(itemsIndex, 1);
      } else {
        state.items[itemsIndex].quantity--;
      }
    },
  },
});

export const { addToCart, removefromCart } = cartSlice.actions;
