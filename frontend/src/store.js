import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './utils/authentication';
import cartReducer from './utils/cart';

// Created Redux store
export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    cartState: cartReducer
  }
});