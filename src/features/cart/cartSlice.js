import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    clearCart:(state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      const itemId = action.payload; // the remove item id 
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    increase: (state, { payload }) => {
      const CartItem = state.cartItems.find((item) => item.id === payload.id);
      CartItem.amount = CartItem.amount + 1;
    }, // deconstruct payload from action

    decrease: (state, { payload }) => {
      const CartItem = state.cartItems.find((item) => item.id === payload.id);
      CartItem.amount = CartItem.amount - 1;
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      });
      state.amount = amount;
      state.total = total;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.CartItem = action.payload;
        state.isLoading = false
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false
      })
  },

  // extraReducers: {
  //   [getCartItems.pending]:(state) => {
  //     state.isLoading = true
  //   },
  //   [getCartItems.fulfilled]:(state, action) => {
  //     state.CartItem = action.payload;
  //     state.isLoading = false
  //   },
  //   [getCartItems.rejected]:(state) => {
  //     state.isLoading = false
  //   },
  // }
});

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;