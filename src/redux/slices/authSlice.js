import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  refreshAction,
} from "../actions/authAction";

const initialState = {
  loading: false,
  access: null,
  refresh: null,
  username: null,
  name: null,
  user_id: null,
  auth: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.access) {
        state.error = null;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.username = action.payload.username;
        state.user_id = action.payload.user_id;
        state.name = action.payload.name;
        state.auth = true;
      }
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.auth = false;
    });
    builder.addCase(logoutAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.loading = false;
      state.access = null;
      state.refresh = null;
      state.username = null;
      state.user_id = null;
      state.auth = false;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.auth = false;
    });
    builder.addCase(refreshAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(refreshAction.fulfilled, (state, action) => {
      state.loading = false;
      state.access = action.payload.access;
    });
    builder.addCase(refreshAction.rejected, (state, action) => {
      state.loading = false;
      state.access = null;
      state.refresh = null;
      state.username = null;
      state.user_id = null;
      state.auth = false;
    });
  },
});

export default authSlice.reducer;
