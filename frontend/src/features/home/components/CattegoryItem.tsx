import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/CategoryCarousel.module.css";

type CategoryType = "sale" | "trending" | "other";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
  type: CategoryType;
}

interface CategoryItemProps {
  category: Category;
  onImageError: (categoryId: string, categoryType: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = React.memo(({ category, onImageError }) => {
  const navigate = useNavigate();

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      onImageError(category.id, category.type);
    },
    [category.id, category.type, onImageError]
  );

  const handleClick = useCallback(() => {
    navigate(category.link);
  }, [navigate, category.link]);

  return (
    <div
      className={styles.categoryItem}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.categoryIcon}>
        <img
          src={category.image}
          alt={category.name}
          className={styles.categoryImage}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <span className={styles.categoryName}>{category.name}</span>
    </div>
  );
});

CategoryItem.displayName = "CategoryItem";
export default CategoryItem;
