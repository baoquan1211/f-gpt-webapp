import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  refreshAction,
} from "@/redux/actions/authAction";

const initialState = {
  loading: false,
  access: null,
  refresh: null,
  username: null,
  name: null,
  user_id: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.access = null;
      state.error = null;
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
      }
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logoutAction.pending, (state) => {
      state.loading = true;
      state.access = null;

      state.error = null;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.access = null;

      state.error = null;
      state.loading = false;
      state.refresh = null;
      state.user_id = null;
      state.username = null;
      state.name = null;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(refreshAction.pending, (state, action) => {
      state.loading = true;
      state.access = null;

      state.error = null;
    });
    builder.addCase(refreshAction.fulfilled, (state, action) => {
      console.log("REFRESHING TOKEN FINISHED");
      state.loading = false;
      state.access = action.payload.access;
    });
    builder.addCase(refreshAction.rejected, (state, action) => {
      console.log("REFRESHING TOKEN FAILED");
      state.access = null;
      state.error = null;
      state.loading = false;
      state.refresh = null;
      state.user_id = null;
      state.username = null;
      state.name = null;
    });
  },
});

export default authSlice.reducer;
