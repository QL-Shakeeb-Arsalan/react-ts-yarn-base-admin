// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import { api } from './api'

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer to the store
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})
