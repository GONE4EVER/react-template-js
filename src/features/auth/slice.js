import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { STATUS_IDLE, STATUS_PENDING } from 'store/constants';

const initialState = {
  status: STATUS_IDLE,

  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },

  token: '',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk('counter/fetchCount', async amount => {
  const response = await fetchCount(amount);
  // The value we return becomes the `fulfilled` action payload

  return response.data;
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    signin: state => {
      state.value += 1;
    },
    signout: state => {
      state.value -= 1;
    },
    updateDetails: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.status = STATUS_PENDING;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = STATUS_IDLE;
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = state => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = amount => (dispatch, getState) => {
  const currentValue = selectCount(getState());

  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
