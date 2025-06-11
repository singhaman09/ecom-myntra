import {type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';

// Typed dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
