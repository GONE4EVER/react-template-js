import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { AuthService } from 'features/auth/service';
import { UsersService } from 'features/users';

export const store = configureStore({
  reducer: {
    [AuthService.reducerPath]: AuthService.reducer,
    [UsersService.reducerPath]: UsersService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(UsersService.middleware).concat(AuthService.middleware),
});

// setupListeners(store.dispatch);
