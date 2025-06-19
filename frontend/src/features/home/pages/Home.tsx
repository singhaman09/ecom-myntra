import styles from './Home.module.css';
import HeroSection from '../components/HeroSection';
import ProductCategoryGrid from '../components/CategoryCarousel';
import ReviewSection from '../components/ReviewSection';
import RecommendedProducts from '../components/RecommendedProducts';
import TrendingProducts from '../components/TrendingProducts';
import PerfectGiftSection from '../components/PerfectGiftSection';
import BestSellerProducts from '../components/BestSellerProducts';
import SummerSaleBanner from '../components/SummerSaleBanner';

const Home = () => {
  const heroSlides = [
    {
      id: '1',
      title: 'TRENDING FASHION',
      subtitle: 'Shop the latest styles for every occasion',
      buttonText: 'SHOP NOW',
      backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
      onButtonClick: () => { }
    },
    {
      id: '2',
      title: 'SUMMER COLLECTION',
      subtitle: 'Fresh styles for the sunny season',
      buttonText: 'EXPLORE NOW',
      backgroundImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=800&fit=crop',
      onButtonClick: () => { }
    },
    {
      id: '3',
      title: 'MEGA SALE',
      subtitle: 'Up to 70% off on all categories',
      buttonText: 'SHOP SALE',
      backgroundImage: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=800&fit=crop',
      onButtonClick: () => { }
    }
  ];

  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        {/* Hero Slider Section */}
        <HeroSection slides={heroSlides} />

        {/* 1. Product Category Grid */}
        <ProductCategoryGrid />

        {/* 2. What did you think of item? */}
        <ReviewSection />

        {/* 3. Recommended Products */}
        <RecommendedProducts />

        {/* 4. Hot Summer Sale Offer Banner */}
        <SummerSaleBanner />

        {/* 6. Trending Products */}
        <TrendingProducts />

        {/* 7. Find the Perfect Gift */}
        <PerfectGiftSection />

        {/* 8. Best Seller Products */}
        <BestSellerProducts />
      </main>
    </div>
  );
};

export default Home;
