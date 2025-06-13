import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

// Creating a typed selector hook so TS knows the shape of your state
export const useAppSelector = useSelector.withTypes<RootState>();
