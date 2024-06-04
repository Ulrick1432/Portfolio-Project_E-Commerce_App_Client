import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './utils/authentication';

// Created Redux store
export default configureStore({
  reducer: {
    authentication: authenticationReducer,
  }
});