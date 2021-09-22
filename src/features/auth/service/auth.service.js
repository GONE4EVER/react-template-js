import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CACHE_KEY = 'auth';

export const AuthService = createApi({
  reducerPath: 'authApi',
  tagTypes: [CACHE_KEY],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    // prepareHeaders: (headers, { getState }) => {
    //   const { token } = getState().auth;

    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),

  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: () => [{ type: CACHE_KEY }],
    }),

    logout: builder.mutation({
      query: () => ({ url: '/logout', method: 'POST' }),
      invalidatesTags: () => [{ type: CACHE_KEY }],
    }),

    getUserAuthState: builder.query({
      query: () => ({ url: 'user' }),
      providesTags: () => [{ type: CACHE_KEY }],
    }),
  }),
});

export const { useGetUserAuthStateQuery, useLoginMutation, useLogoutMutation } = AuthService;
