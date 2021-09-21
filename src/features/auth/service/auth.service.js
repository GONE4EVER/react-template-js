import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthService = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    getUserAuthState: builder.query({
      query: () => ({ url: 'user' }),
      transformResponse: (data, { request, response }) => {
        console.log(data, {
          request,
          response,
        });

        return data;
      },
    }),
  }),
});

export const { useGetUserAuthStateQuery, useLoginMutation } = AuthService;
