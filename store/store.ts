import { friendsAPI } from "@/services/Friends.service";
import { applicationsAPI } from "@/services/Applications.service";
import { questionsAPI } from "@/services/Questions.service";
import { categoriesAPI } from "./../services/Categories.service";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [friendsAPI.reducerPath]: friendsAPI.reducer,
  [applicationsAPI.reducerPath]: applicationsAPI.reducer,
  [questionsAPI.reducerPath]: questionsAPI.reducer,
  [categoriesAPI.reducerPath]: categoriesAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      friendsAPI.middleware,
      applicationsAPI.middleware,
      questionsAPI.middleware,
      categoriesAPI.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
