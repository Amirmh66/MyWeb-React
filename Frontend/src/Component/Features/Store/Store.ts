import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../SoppingCart/CartSlice/Cart-Slice";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../Authentication/AuthSlice/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export  const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
