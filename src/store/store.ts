import { configureStore } from '@reduxjs/toolkit';
import { groupReducer } from './reducers/group.reducer';

const rootReducer = {
  groupModule: groupReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
