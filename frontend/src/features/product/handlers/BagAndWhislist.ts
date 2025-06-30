 // Adjust the import path as needed
import type { AppDispatch } from '../../../store/store';
import { addCartItem, deleteCartItem } from '../../cart/redux/cartSlice';
import type { CartItem } from '../../cart/types/cart';
import { addToWishlist, removeFromWishlist } from '../../wishlist/slice/wishlistSlice';
import type { WishlistItem } from '../../wishlist/types/wishlist';


// Add to Bag
export const addToBag = (
  dispatch: AppDispatch,
  id: string | undefined,
  selectedColor: string | null,
  selectedSize: string | null
) => {
  const productId = id || '';
  dispatch(addCartItem({
    productId,
    size: selectedSize || '',
    color: selectedColor || ''
  }));
};

// Remove from Bag
export const removeFromBag = (
  dispatch: AppDispatch,
   id: string | undefined,
  cartData: CartItem[]
) => {
  const productId = id || '';
  const cartId = cartData.find(val => val.productId === productId)?.cartId;
  if (cartId) {
    dispatch(deleteCartItem(cartId));
  }
};

// Remove from Wishlist
export const removeWishlist = (
  dispatch: AppDispatch,
  id: string | undefined,
  wishlistData: WishlistItem[]
) => {
  const wishlistId = wishlistData.find(val => val.productId === id)?.id;
  if (wishlistId) {
    dispatch(removeFromWishlist(wishlistId));
  }
};

// Add to Wishlist
export const addWishlist = (
    dispatch: AppDispatch,
  id: string | undefined,
  
  selectedColor: string | null,
  selectedSize: string | null
) => {
  const productId = id || '';
  dispatch(addToWishlist({
    productId,
    size: selectedSize || '',
    color: selectedColor || ''
  }));
};
