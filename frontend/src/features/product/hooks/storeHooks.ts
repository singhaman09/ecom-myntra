import {type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';

// Typed dispatch hook
export const useProductDispatch = () => useDispatch<AppDispatch>();

// Typed selector hook
export const useProductSelector: TypedUseSelectorHook<RootState> = useSelector;
