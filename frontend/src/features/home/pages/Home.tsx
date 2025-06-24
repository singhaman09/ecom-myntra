import React, { Suspense, lazy, useMemo } from "react";
import styles from "./Home.module.css";

// Lazy load components
const HeroSection = lazy(() => import("../components/HeroSection"));
const ProductCategoryGrid = lazy(
  () => import("../components/CategoryCarousel")
);
const ReviewSection = lazy(() => import("../components/ReviewSection"));
const RecommendedProducts = lazy(
  () => import("../components/RecommendedProducts")
);
const TrendingProducts = lazy(() => import("../components/TrendingProducts"));
const PerfectGiftSection = lazy(
  () => import("../components/PerfectGiftSection")
);
const BestSellerProducts = lazy(
  () => import("../components/BestSellerProducts")
);
const SummerSaleBanner = lazy(() => import("../components/SummerSaleBanner"));

const Home: React.FC = () => {
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
        onButtonClick: () => {},
      },
      {
        id: "2",
        title: "SUMMER COLLECTION",
        subtitle: "Fresh styles for the sunny season",
        buttonText: "EXPLORE NOW",
        backgroundImage:
          "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=800&fit=crop",
        onButtonClick: () => {},
      },
      {
        id: "3",
        title: "MEGA SALE",
        subtitle: "Up to 70% off on all categories",
        buttonText: "SHOP SALE",
        backgroundImage:
          "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&h=800&fit=crop",
        onButtonClick: () => {},
      },
    ],
    []
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
