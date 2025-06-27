import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '../../services/addressService';
import type { Address } from '../../types/profile.types';

interface AddressState {
  items: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAddresses = createAsyncThunk(
  'addresses/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAddresses();
      return data;
    } catch (err: any) {
      return rejectWithValue('Failed to load addresses');
    }
  }
);

export const createAddress = createAsyncThunk(
  'addresses/createAddress',
  async (address: Omit<Address, '_id'>, { rejectWithValue }) => {
    try {
      const newAddr = await addAddress(address);
      if (address.isDefault) {
        await setDefaultAddress(newAddr._id);
      }
      return newAddr;
    } catch (err) {
      return rejectWithValue('Failed to add address');
    }
  }
);

export const modifyAddress = createAsyncThunk(
  'addresses/modifyAddress',
  async (address: Address, { rejectWithValue }) => {
    try {
      const updated = await updateAddress(address);
      if (address.isDefault) {
        await setDefaultAddress(updated._id);
      }
      return updated;
    } catch {
      return rejectWithValue('Failed to update address');
    }
  }
);

export const removeAddress = createAsyncThunk(
  'addresses/removeAddress',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteAddress(id);
      return id;
    } catch {
      return rejectWithValue('Failed to delete address');
    }
  }
);

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // createAddress
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.isDefault) {
          state.items = state.items.map((addr) => ({
            ...addr,
            isDefault: false,
          }));
        }
        state.items.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      //modifyAddress
      .addCase(modifyAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((addr) =>
          addr._id === action.payload._id ? action.payload : addr
        );
        if (action.payload.isDefault) {
          state.items = state.items.map((addr) => ({
            ...addr,
            isDefault: addr._id === action.payload._id,
          }));
        }
      })
      .addCase(modifyAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      //removeAddress
      .addCase(removeAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((addr) => addr._id !== action.payload);
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default addressSlice.reducer;