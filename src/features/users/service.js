import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiConfig } from 'common/api/index';

const CACHE_KEY = 'User';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: apiConfig.baseUri }),
  tagTypes: ['User'],

  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({ url: 'users' }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: CACHE_KEY, id })), { type: CACHE_KEY, id: 'LIST' }]
          : [{ type: CACHE_KEY, id: 'LIST' }],
    }),

    getUserDetails: builder.query({
      query: id => ({ url: 'users', params: { id } }),
      providesTags: (result, error, id) => [{ type: CACHE_KEY, id }],
    }),

    addUser: builder.mutation({
      query: body => ({
        url: `users`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: CACHE_KEY, id: 'LIST' }],
    }),

    updateUserById: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const updateResult = dispatch(
          usersApi.util.updateQueryData('getUserDetails', id, draft => Object.assign(draft, patch)),
        );

        try {
          await queryFulfilled;
        } catch {
          updateResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: CACHE_KEY, id }],
    }),

    deleteUser: builder.mutation({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CACHE_KEY, id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
