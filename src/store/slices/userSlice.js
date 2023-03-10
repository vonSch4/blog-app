import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogService from '../../services';
import { setItem } from '../../storage/storage';

export const registerNewUser = createAsyncThunk(
  'user/registerNewUser',
  async (params, { rejectWithValue }) => {
    try {
      const user = await blogService.registerNewUser(params);

      setItem('token', user?.data?.user?.token);
      return user.data;
    } catch ({ message, name, response }) {
      const { errors } = response.data;

      return rejectWithValue({ message, name, errors });
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (params, { rejectWithValue }) => {
    try {
      const user = await blogService.loginUser(params);

      setItem('token', user?.data?.user?.token);
      return user.data;
    } catch ({ message, name, response }) {
      const { errors } = response.data;

      return rejectWithValue({ message, name, errors });
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  'user/updateProfileUser',
  async (params, { rejectWithValue }) => {
    try {
      const updatedUser = await blogService.updateProfileUser(params);

      setItem('token', updatedUser?.data?.user?.token);
      return updatedUser.data;
    } catch ({ message, name, response }) {
      const { errors } = response.data;

      return rejectWithValue({ message, name, errors });
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (params, { rejectWithValue }) => {
    try {
      const user = await blogService.getUser(params);

      setItem('token', user?.data?.user?.token);
      return user.data;
    } catch ({ message, name, response }) {
      const { errors } = response.data;

      return rejectWithValue({ message, name, errors });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLogin: false,
    isLoading: false,
    isUpdated: false,
    isError: false,
    error: null,
  },
  reducers: {
    clearUpdate: (state) => {
      state.isUpdated = false;
    },
    clearError: (state) => {
      state.isError = false;
      state.error = null;
    },
    logOut: (state) => {
      state.user = {};
      state.isLogin = false;
      state.isLoading = false;
      state.isUpdated = false;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.pending, (state) => {
      state.isLogin = false;
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.user = action.payload.user;
    });

    builder.addCase(registerNewUser.rejected, (state, action) => {
      state.isLogin = false;
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLogin = false;
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.user = action.payload.user;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLogin = false;
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addCase(updateProfileUser.pending, (state) => {
      state.isUpdated = false;
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(updateProfileUser.fulfilled, (state, action) => {
      state.isUpdated = true;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.user = action.payload.user;
    });

    builder.addCase(updateProfileUser.rejected, (state, action) => {
      state.isUpdated = false;
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLogin = false;
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.user = action.payload.user;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.isLogin = false;
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { clearUpdate, clearError, logOut } = userSlice.actions;

export default userSlice.reducer;
