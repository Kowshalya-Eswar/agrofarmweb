import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to add user data upon successful login
    addUser: (state, action) => {
      state.currentUser = action.payload; // Payload will be user data without password
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // Action to clear user data upon logout
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    // Actions for handling loading and error states during async operations (e.g., login)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addUser, logoutUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
