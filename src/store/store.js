import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authReducer, AuthService } from 'features/auth';
import { usersApi } from 'features/users';

export const store = configureStore({
  reducer: {
    [AuthService.reducerPath]: AuthService.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware),
});

// setupListeners(store.dispatch);
