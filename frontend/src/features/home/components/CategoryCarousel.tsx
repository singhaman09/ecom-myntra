import React, { useState, useEffect, useRef } from 'react';
import styles from './css/CategoryCarousel.module.css';

interface Category {
  id: string;
  name: string;
  image: string;
  type: 'sale' | 'trending' | 'face' | 'other';
}

interface CategoryCarouselProps {
  categories?: Category[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default categories data with image URLs
  const defaultCategories: Category[] = [
    { id: '1', name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '2', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop&crop=center', type: 'trending' },
    { id: '3', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '4', name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop&crop=center', type: 'trending' },
    { id: '5', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '6', name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '7', name: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop&crop=center', type: 'face' },
    { id: '8', name: 'Kurtas', image: 'https://images.unsplash.com/photo-1583743089690-ca20696c2818?w=100&h=100&fit=crop&crop=center', type: 'face' },
    { id: '9', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '10', name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '11', name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '12', name: 'Sale', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop&crop=center', type: 'sale' },
    { id: '13', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '14', name: 'Skirts', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop&crop=center', type: 'other' },
    { id: '15', name: 'Suits', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center', type: 'other' },
  ];

  const categoryData = categories || defaultCategories;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate pages based on screen size
  const itemsPerPage = isMobile ? 6 : 5; // Mobile: 3x2 grid, Desktop: 5x1 row
  const totalPages = Math.ceil(categoryData.length / itemsPerPage);

  // Handle scroll event to update current page
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newPage = Math.round(scrollLeft / containerWidth);
      setCurrentPage(newPage);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (pageIndex: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const targetScroll = pageIndex * container.clientWidth;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
      case 'trending':
        return 'linear-gradient(135deg, #4ecdc4, #44b3ab)';
      case 'face':
        return 'linear-gradient(135deg, #ff9ff3, #f368e0)';
      default:
        return 'linear-gradient(135deg, #a8a8a8, #888888)';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <div
          ref={containerRef}
          className={styles.categoriesContainer}
        >
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div
              key={pageIndex}
              className={`${styles.categoriesPage} ${
                isMobile ? styles.mobileGrid : styles.desktopGrid
              }`}
            >
              {categoryData
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((category) => (
                  <div
                    key={category.id}
                    className={styles.categoryItem}
                    onClick={() => console.log(`Selected: ${category.name}`)}
                  >
                    <div className={styles.categoryIcon}>
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className={styles.categoryImage}
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.style.background = getTypeColor(category.type);
                        }}
                      />
                    </div>
                    <span className={styles.categoryName}>{category.name}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                currentPage === index ? styles.activeDot : ''
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;