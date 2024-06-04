// Maybe this could be used later for storing authentication status instead of the "useEffect" in the header component!
//https://redux.js.org/tutorials/quick-start
import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    value: false
  },
  reducers: {}
});

export default authenticationSlice.reducer;