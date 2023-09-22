import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { login, logout, refresh } from "../../services/Auth";

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await login({ username, password });
      if (response.status == 401)
        return thunkAPI.rejectWithValue(response.data);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (refreshToken, thunkAPI) => {
    try {
      const response = await logout(refreshToken);
      if (response.status == 401)
        return thunkAPI.rejectWithValue(response.data);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const refreshAction = createAsyncThunk(
  "auth/refresh",
  async (thunkAPI) => {
    try {
      const response = await refresh();
      if (response.status >= 400)
        return thunkAPI.rejectWithValue(response.data);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
