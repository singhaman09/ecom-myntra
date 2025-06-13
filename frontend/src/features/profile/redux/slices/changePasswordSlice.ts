import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { changePassword, verifyPassword } from '../../services/userService';

interface ChangePasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
  verified: boolean;
}

const initialState: ChangePasswordState = {
  loading: false,
  error: null,
  success: false,
  verified: false,
};

export const verifyCurrentPasswordThunk = createAsyncThunk(
  'user/verifyCurrentPassword',
  async ({ currentPassword }: { currentPassword: string }, { rejectWithValue }) => {
    try {
      const res = await verifyPassword(currentPassword);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Verification failed');
    }
  }
);


export const changePasswordThunk = createAsyncThunk(
  'user/changePassword',
  async (
    {
      oldPassword,
      newPassword,
    }: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      await changePassword(oldPassword, newPassword);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to change password');
    }
  }
);

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    resetChangePasswordState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyCurrentPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verified = false;
      })
      .addCase(verifyCurrentPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(verifyCurrentPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.verified = false;
      })
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetChangePasswordState } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
