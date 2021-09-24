import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { AuthService } from 'features/auth/service';

export const store = configureStore({
  reducer: {
    [AuthService.reducerPath]: AuthService.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(AuthService.middleware),
});

// setupListeners(store.dispatch);
