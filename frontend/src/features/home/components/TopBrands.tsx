
import styles from './css/TopBrands.module.css';
import { Link } from 'react-router-dom';

interface Brand {
  id: string;
  name: string;
  logo: string;
  discount: string;
  link:string
}

interface TopBrandsProps {
  brands: Brand[];
  title: string;
}

const TopBrands = ({ brands, title }: TopBrandsProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.brandsGrid}>
          {brands.map((brand) => (
           <Link  key={brand.id} 
             to={brand.link} 
            >
             <div key={brand.id} className={styles.brandCard}>
              <div className={styles.brandLogoWrapper}>
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className={styles.brandLogo}
                />
              </div>
              <div className={styles.brandInfo}>
                <h3 className={styles.brandName}>{brand.name}</h3>
                <p className={styles.brandDiscount}>{brand.discount}</p>
              </div>
            </div>
           </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBrands;
