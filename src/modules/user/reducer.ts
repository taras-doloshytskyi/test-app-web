import { AsyncStatus } from '@appello/common/lib/constants';
import { createReducer } from '@reduxjs/toolkit';

import { setAuth, setUser } from './actions';
import { UserState } from './types';

export const initialState: UserState = {
  profileStatus: AsyncStatus.IDLE,
  profile: null,
  auth: null,
};

export const userReducer = createReducer(initialState, builder =>
  builder
    .addCase(setUser, (state, { payload }) => {
      state.profile = payload;
    })
    .addCase(setAuth, (state, { payload }) => {
      state.auth = payload;
    }),
);
