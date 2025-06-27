import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import styles from "./css/CategoryCarousel.module.css";
import CategoryItem from "./CattegoryItem";
import { useHorizontalSmoothScroll } from "../hooks/useHorizontalSmoothScroll";

type CategoryType = "sale" | "trending" | "other";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
  type: CategoryType;
}

interface CategoryCarouselProps {
  categories?: Category[];
}

const MOBILE_BREAKPOINT = 768;
const MOBILE_ITEMS_PER_PAGE = 6;
const DESKTOP_ITEMS_PER_PAGE = 5;

const TYPE_COLORS: Record<CategoryType, string> = {
  sale: "linear-gradient(135deg, #ff6b6b, #ff8e8e)",
  trending: "linear-gradient(135deg, #4ecdc4, #44b3ab)",
  other: "linear-gradient(135deg, #a8a8a8, #888888)",
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/shirts"
  },
  {
    id: "2",
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop&crop=center",
    type: "trending",
    link: "/products/t-shirts"
  },
  {
    id: "3",
    name: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/jeans"
  },
  {
    id: "4",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop&crop=center",
    type: "trending",
    link: "/products/dresses"
  },
  {
    id: "5",
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/sneakers"
  },
  {
    id: "6",
    name: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/jackets"
  },
  {
    id: "9",
    name: "Watches",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/watches"
  },
  {
    id: "10",
    name: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/bags"
  },
  {
    id: "11",
    name: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/shorts"
  },
  {
    id: "12",
    name: "Sale",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop&crop=center",
    type: "sale",
    link: "/products/sale"
  },
  {
    id: "13",
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/hoodies"
  },
  {
    id: "14",
    name: "Skirts",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/skirts"
  },
  {
    id: "15",
    name: "Suits",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/suits"
  },
  {
    id: "16",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/accessories"
  },
  {
    id: "17",
    name: "Winter Sale",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop&crop=center",
    type: "sale",
    link: "/products/winter-sale"
  },
  {
    id: "18",
    name: "Sweatshirts",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/sweatshirts"
  },
  {
    id: "19",
    name: "Mini Skirts",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/mini-skirts"
  },
  {
    id: "20",
    name: "Formal Wear",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
    type: "other",
    link: "/products/formal-wear"
  }
];


const checkIsMobile = (): boolean => window.innerWidth <= MOBILE_BREAKPOINT;

const getTypeColor = (type: CategoryType): string => TYPE_COLORS[type];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return checkIsMobile();
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const useScrollHandler = (
  containerRef: React.RefObject<HTMLDivElement>,
  onPageChange: (page: number) => void
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newPage = Math.round(scrollLeft / containerWidth);
      onPageChange(newPage);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", throttledScroll, { passive: true });
    return () => container.removeEventListener("scroll", throttledScroll);
  }, [containerRef, onPageChange]);
};

const CategoryCarousel: React.FC<CategoryCarouselProps> = memo(({ categories }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useHorizontalSmoothScroll(containerRef);
  const isMobile = useIsMobile();

  const categoryData = useMemo(() => categories || DEFAULT_CATEGORIES, [categories]);

  const paginationData = useMemo(() => {
    const itemsPerPage = isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE;
    const totalPages = Math.ceil(categoryData.length / itemsPerPage);
    return { itemsPerPage, totalPages };
  }, [isMobile, categoryData.length]);

  const paginatedCategories = useMemo(() => {
    const { itemsPerPage, totalPages } = paginationData;
    return Array.from({ length: totalPages }, (_, pageIndex) =>
      categoryData.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
    );
  }, [categoryData, paginationData]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleDotClick = useCallback((pageIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const targetScroll = pageIndex * container.clientWidth;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, []);

  const handleImageError = useCallback((categoryId: string, categoryType: string) => {
    const imgElement = document.querySelector(`img[alt*="${categoryId}"]`) as HTMLImageElement;
    if (imgElement?.parentElement) {
      imgElement.style.display = "none";
      imgElement.parentElement.style.background = getTypeColor(categoryType as CategoryType);
    }
  }, []);

  useScrollHandler(containerRef, handlePageChange);

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <div ref={containerRef} className={styles.categoriesContainer}>
          {paginatedCategories.map((pageCategories, pageIndex) => (
            <div
              key={pageIndex}
              className={`${styles.categoriesPage} ${
                isMobile ? styles.mobileGrid : styles.desktopGrid
              }`}
            >
              {pageCategories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  onImageError={handleImageError}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {isMobile && paginationData.totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: paginationData.totalPages }, (_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentPage === index ? styles.activeDot : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to page ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
});

CategoryCarousel.displayName = "CategoryCarousel";
export default CategoryCarousel;
