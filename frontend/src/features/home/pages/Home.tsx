import React, { lazy, useMemo } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useLenisScroll } from "../hooks/useLenisScroll";

// Lazy load components
const HeroSection = lazy(() => import("../components/HeroSection/HeroSection"));
const ProductCategoryGrid = lazy(
  () => import("../components/CategoryCarousel/CategoryCarousel")
);
const ReviewSection = lazy(() => import("../components/ReviewSection/ReviewSection"));
const RecommendedProducts = lazy(
  () => import("../components/RecommendedProducts/RecommendedProducts")
);
const TrendingProducts = lazy(() => import("../components/TrendingProducts/TrendingProducts"));
const PerfectGiftSection = lazy(
  () => import("../components/GiftSection/PerfectGiftSection")
);
const BestSellerProducts = lazy(
  () => import("../components/BestSellerProducts/BestSellerProducts")
);
const SummerSaleBanner = lazy(() => import("../components/SaleBanners/SummerSaleBanner"));

const Home: React.FC = () => {
  const navigate = useNavigate();

  useLenisScroll();
  // Memoize slide data so it's not recreated on every render
  const heroSlides = useMemo(
    () => [
      {
        id: "1",
        title: "TRENDING FASHION",
        subtitle: "Shop the latest styles for every occasion",
        buttonText: "SHOP NOW",
        backgroundImage:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
        onButtonClick: () => {navigate('/products')},
      },
      {
        id: "2",
        title: "SUMMER COLLECTION",
        subtitle: "Fresh styles for the sunny season",
        buttonText: "EXPLORE NOW",
        backgroundImage:
          "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=800&fit=crop",
        onButtonClick: () => {navigate('/products')},
      },
      {
        id: "3",
        title: "MEGA SALE",
        subtitle: "Up to 70% off on all categories",
        buttonText: "SHOP SALE",
        backgroundImage:
          "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=800&fit=crop",
        onButtonClick: () => {navigate('/products')},
      },
    ],
    [navigate]
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HeroSection slides={heroSlides} />

        <ProductCategoryGrid />

        <ReviewSection />

        <RecommendedProducts />

        <SummerSaleBanner />

        <TrendingProducts />

        <PerfectGiftSection />

        <BestSellerProducts />
      </main>
    </div>
  );
};

export default React.memo(Home);
