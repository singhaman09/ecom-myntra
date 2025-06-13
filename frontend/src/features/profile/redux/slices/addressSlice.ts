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
  async (address: Omit<Address, 'id'>, { rejectWithValue }) => {
    try {
      const newAddr = await addAddress(address);
      if (address.isDefault) {
        await setDefaultAddress(newAddr.id);
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
      const updated = await updateAddress(address.id, address);
      if (address.isDefault) {
        await setDefaultAddress(updated.id);
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
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        if (action.payload.isDefault) {
          state.items = state.items.map((addr) => ({
            ...addr,
            isDefault: false,
          }));
        }
        state.items.push(action.payload);
      })
      .addCase(modifyAddress.fulfilled, (state, action) => {
        state.items = state.items.map((addr) =>
          addr.id === action.payload.id ? action.payload : addr
        );
        if (action.payload.isDefault) {
          state.items = state.items.map((addr) => ({
            ...addr,
            isDefault: addr.id === action.payload.id,
          }));
        }
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.items = state.items.filter((addr) => addr.id !== action.payload);
      });
  },
});

export default addressSlice.reducer;
