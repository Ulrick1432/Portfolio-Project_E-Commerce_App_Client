import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: null
  },
  reducers: {
    cartState: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { cartState } = cartSlice.actions;

export default cartSlice.reducer;