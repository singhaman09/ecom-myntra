import React from 'react';
import { Star, Plus } from 'lucide-react';
import styles from './BoughtTogether.module.css';
import defaultProductImage from '../../../../../assets/cart.png'
interface Product {
  id: string;
  name: string;
  volume: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
}

const BoughtTogether: React.FC = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Anti-Dandruff Shampoo',
      volume: '750 ml',
      price: 450,
      rating: 4.5,
      reviewCount: 487,
      image: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Pink Grapefruit Shower Gel',
      volume: '750 ml',
      price: 450,
      rating: 4.5,
      reviewCount: 487,
      image: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'Festive Berry Body Lotion',
      volume: '750 ml',
      price: 450,
      rating: 4.5,
      reviewCount: 487,
      image: '/placeholder.svg',
    },
  ];

  const bundlePrice = 1499;

 

  return (
    <div className={styles.container}>
        <div>
      <h3 className={styles.title}>Frequently Bought Together</h3>

      
      <div className={styles.productsRow}>
        {products.map((product, index) => (
          <React.Fragment key={product.id} >
            <div className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} className={styles.image}  onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultProductImage;
           
            (e.currentTarget as HTMLImageElement).onerror = null;
          }} />
              </div>
              <h4 className={styles.productName}>{product.name}</h4>
              <div className={styles.ratingRow}>
                { <Star
       
            className={`${styles.star} ${
            styles.filledStar 
              }`}
     />}
                <span className={styles.ratingText}>
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
              <p className={styles.volume}>{product.volume}</p>
              <p className={styles.price}>₹{product.price}</p>
              {index < products.length - 1 && (
              <div className={styles.plusWrapper}>
                <Plus className={styles.plusIcon} />
              </div>
            )}
            </div>

           
          </React.Fragment>
        ))}
      </div>

      
      <div className={styles.footer}>
        <div>
          <div className={styles.bundlePrice}>₹ {bundlePrice.toLocaleString()}</div>
          <div className={styles.bundleLabel}>Price for all 3</div>
        </div>
        <button className={styles.addToBagBtn}>Add to Bag</button>
      </div></div>
    </div>
  );
};

export default BoughtTogether;
