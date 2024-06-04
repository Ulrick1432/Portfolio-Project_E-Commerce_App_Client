import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    value: false
  },
  reducers: {}
});

export default authenticationSlice.reducer;