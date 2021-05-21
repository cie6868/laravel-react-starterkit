import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
    },
    refresh: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, refresh, logout } = authSlice.actions;

export default authSlice.reducer;
