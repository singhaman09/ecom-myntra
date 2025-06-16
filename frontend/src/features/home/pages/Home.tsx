import styles from './Home.module.css';
import HeroSection from '../components/HeroSection';
import ShopByCategory from '../components/ShopByCategory';
import SaleBanners from '../components/SaleBanner';
import TopBrands from '../components/TopBrands';

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

  const categories = [
    {
      id: '1',
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=300&fit=crop',
      link: '/products/clothing'
    },
    {
      id: '2',
      name: 'Footwear',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=300&h=300&fit=crop',
      link: '/products/footwear'
    },
    {
      id: '3',
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      link: '/products/electronics'
    },
    {
      id: '4',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop',
      link: '/products/accessories'
    },
    {
      id: '5',
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      link: '/products/beauty'
    },
    {
      id: '6',
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
      link: '/products/home-living'
    }
  ];

  
  const brands = [
    {
      id: '1',
      name: 'Samsung',
      logo: 'https://images.unsplash.com/photo-1523170335258-f5c6c6bd6eaf?w=100&h=100&fit=crop',
      discount: 'Up to 50% OFF',
      link: '/products/Samsung'
    },
    {
      id: '2',
      name: 'Zara',
      logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop',
      discount: 'Up to 40% OFF',
      link: '/products/zara'
    },
    {
      id: '3',
      name: 'Nike',
      logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      discount: 'Up to 60% OFF',
      link: '/products/nike'
    },
    {
      id: '4',
      name: 'Adidas',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      discount: 'Up to 45% OFF',
      link: '/products/adidas'
    },
    {
      id: '5',
      name: 'Puma',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      discount: 'Up to 55% OFF',
      link: '/products/puma'
    },
    {
      id: '6',
      name: "Levi's",
      logo: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=100&h=100&fit=crop',
      discount: 'Up to 35% OFF',
      link: '/products/levis'
    }
  ];

  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        {/* Hero Slider Section */}
        <HeroSection slides={heroSlides} />

        {/* Shop by Category */}
        <ShopByCategory
          title="Shop by Category"
          categories={categories}
        />

        {/* End of Season Sale Banner */}
        <SaleBanners
          title="End of Season Sale"
          subtitle="Up to 70% off on selected items - Limited time offer"
          backgroundImage="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=600&fit=crop"
          ctaText="Shop Sale Now"
          onCtaClick={() => { }}
        />

        {/* Top Brands */}
        <TopBrands
          title="Top Brands"
          brands={brands}
        />

        {/* New Arrivals Banner */}
        <SaleBanners
          title="New Arrivals"
          subtitle="Discover fresh styles and latest trends"
          backgroundImage="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=600&fit=crop"
          ctaText="Explore New"
          onCtaClick={() => { }}
        />
      </main>
    </div>
  );
};

export default Home;
