import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const COMPARISON_FIELD = 'firstName';

const usersAdapter = createEntityAdapter({});

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `userAdded` action type / creator
    userAdded: usersAdapter.addOne,
    usersReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      usersAdapter.setAll(state, action.payload.users);
    },
  },
});

// Can create a set of memoized selectors based on the location of this entity state
export const usersSelectors = usersAdapter.getSelectors(state => state.users);

// const allusers = usersSelectors.selectAll(store.getState());
