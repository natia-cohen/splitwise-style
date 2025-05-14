import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

interface Group {
  _id: string;
  title: string;
  members: string[];
  expenses: Expense[];
}

interface GroupState {
  groups: Group[];
  group: Group | null;
  isLoading: boolean;
  lastRemovedGroup?: Group;
}


const initialState: GroupState = {
  groups: [],
  group: null,
  isLoading: false,
  lastRemovedGroup: undefined,
};


const groupSlice = createSlice({
  name: 'groupModule',
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
    },
    setGroup(state, action: PayloadAction<Group>) {
      state.group = action.payload;
    },
    removeGroup(state, action: PayloadAction<string>) {
      const groupId = action.payload;
      const removed = state.groups.find(group => group._id === groupId);
      state.groups = state.groups.filter(group => group._id !== groupId);
      state.lastRemovedGroup = removed;
    },
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
    updateGroup(state, action: PayloadAction<Group>) {
      state.groups = state.groups.map(group =>
        group._id === action.payload._id ? action.payload : group
      );
    },
 
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});


export const {
  setGroups,
  setGroup,
  removeGroup,
  addGroup,
  updateGroup,
  setLoading,
} = groupSlice.actions;

export const groupReducer = groupSlice.reducer;
