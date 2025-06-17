// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { changePassword, verifyPassword } from '../../services/userService';

// interface ChangePasswordState {
//   loading: boolean;
//   error: string | null;
//   success: boolean;
//   verified: boolean;
// }

// const initialState: ChangePasswordState = {
//   loading: false,
//   error: null,
//   success: false,
//   verified: false,
// };

// export const verifyCurrentPasswordThunk = createAsyncThunk(
//   'user/verifyCurrentPassword',
//   async ({ currentPassword }: { currentPassword: string }, { rejectWithValue }) => {
//     try {
//       const res = await verifyPassword(currentPassword);
//       return res;
//     } catch (err: any) {
//       return rejectWithValue(err.message || 'Verification failed');
//     }
//   }
// );


// export const changePasswordThunk = createAsyncThunk(
//   'user/changePassword',
//   async (
//     {
//       oldPassword,
//       newPassword,
//     }: { oldPassword: string; newPassword: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       await changePassword(oldPassword, newPassword);
//     } catch (err: any) {
//       return rejectWithValue(err.message || 'Failed to change password');
//     }
//   }
// );

// const changePasswordSlice = createSlice({
//   name: 'changePassword',
//   initialState,
//   reducers: {
//     resetChangePasswordState(state) {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//       state.verified = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(verifyCurrentPasswordThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.verified = false;
//       })
//       .addCase(verifyCurrentPasswordThunk.fulfilled, (state) => {
//         state.loading = false;
//         state.verified = true;
//       })
//       .addCase(verifyCurrentPasswordThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.verified = false;
//       })
//       .addCase(changePasswordThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(changePasswordThunk.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(changePasswordThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetChangePasswordState } = changePasswordSlice.actions;
// export default changePasswordSlice.reducer;






























import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// We only need changePassword from userService now, as verifyPassword will be handled by backend within the same call
import { changePassword } from '../../services/userService'; 

interface ChangePasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
  // 'verified' state is removed as it's no longer needed for the single-step UI
}

const initialState: ChangePasswordState = {
  loading: false,
  error: null,
  success: false,
  // 'verified' property removed from initial state
};

// Removed verifyCurrentPasswordThunk as per the single-step design.
// The backend's changePassword endpoint is expected to handle current password verification.

export const changePasswordThunk = createAsyncThunk(
  'user/changePassword',
  async (
    {
      oldPassword, // This will be the currentPassword from the frontend form
      newPassword,
    }: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      // The changePassword service function should now send both old and new passwords.
      // Its backend counterpart is expected to verify oldPassword internally.
      await changePassword(oldPassword, newPassword);
      return true; // Return a value to indicate fulfillment
    } catch (err: any) {
      // Assuming err.message will contain the specific error (e.g., 'Current password incorrect')
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
      // 'verified' state reset removed
    },
  },
  extraReducers: (builder) => {
    builder
      // Removed all addCase for verifyCurrentPasswordThunk
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null; // Clear any previous error on success
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false; // Ensure success is false on rejection
      });
  },
});

export const { resetChangePasswordState } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;