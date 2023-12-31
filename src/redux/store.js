import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "auth",
  storage,
};

const persistReducers = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistReducers,
  },
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);
