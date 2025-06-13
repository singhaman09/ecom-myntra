// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { User } from '../../types/profile.types';
// import { getUser } from '../../services/userService';



// interface UserState {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// export const fetchUser = createAsyncThunk(
//   'user/fetchUser',
//   async (_, thunkAPI) => {
//     try {
//       const response = await getUser();
//       return response as User;
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Failed to fetch user');
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     updateUser(state, action: PayloadAction<User>) {
//       state.user = action.payload;
//     }
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchUser.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   }
// });

// export const { updateUser } = userSlice.actions;
// export default userSlice.reducer;









import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/profile.types';
import { getUser } from '../../services/userService';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await getUser();
      return response as User;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setToken(_, action: PayloadAction<string>) {
      localStorage.setItem('authToken', action.payload);
    },
    clearToken() {
      localStorage.removeItem('authToken');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateUser, setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
