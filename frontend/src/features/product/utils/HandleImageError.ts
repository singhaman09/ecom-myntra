
import defaultProductImage from '../../../assets/cart.png'
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = defaultProductImage;
    (e.currentTarget as HTMLImageElement).onerror = null;
  }