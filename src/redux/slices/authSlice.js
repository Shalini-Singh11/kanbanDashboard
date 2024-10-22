import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/Apiservices'; 

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const users = await apiService.get('users');  //=============== fetch user from api ===============
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

      if (!user) {
        return rejectWithValue('Invalid email or password');
      }

      localStorage.setItem('Token', user.token); 

      dispatch(loginSuccess({ id: user.id, email: user.email })); 
      return { id: user.id, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {           //=============== for logout ===============
      state.user = null;
      localStorage.removeItem('Token'); 
    },
    loginSuccess: (state, action) => {
      state.user = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;

