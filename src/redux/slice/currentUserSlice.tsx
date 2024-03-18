import {createSlice} from '@reduxjs/toolkit';

export type userCredentialsType = {
  username: string;
  password: string;
};

const defaultState: userCredentialsType = {
  username: '',
  password: '',
};

const slice = createSlice({
  name: 'userCredentials',
  initialState: defaultState,
  reducers: {
    setCurrentUser: (state, action: {payload: userCredentialsType}) => {
      return {...action.payload};
    },
  },
});

export const {setCurrentUser} = slice.actions;
export default slice.reducer;
