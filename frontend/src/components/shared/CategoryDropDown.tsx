import React, { useState, useEffect } from "react";
import { ChevronDown, Grid3X3, X } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./css/CategoryDropDown.module.css";

interface SubcategoryItem {
  name: string;
  path: string;
}

interface SubcategoryGroup {
  title: string;
  items: SubcategoryItem[];
}

interface Category {
  id: string;
  name: string;
  path: string;
  subcategories: SubcategoryGroup[];
}

const categoryData: Category[] = [
  {
    id: "men",
    name: "Men",
    path: "/products/men",
    subcategories: [
      {
        title: "Topwear",
        items: [
          { name: "T-Shirts", path: "/products/men/t-shirts" },
          { name: "Casual Shirts", path: "/products/men/casual-shirts" },
          { name: "Formal Shirts", path: "/products/men/formal-shirts" },
          { name: "Sweatshirts", path: "/products/men/sweatshirts" },
          { name: "Sweaters", path: "/products/men/sweaters" },
          { name: "Jackets", path: "/products/men/jackets" },
        ],
      },
      {
        title: "Bottomwear",
        items: [
          { name: "Jeans", path: "/products/men/jeans" },
          { name: "Casual Trousers", path: "/products/men/casual-trousers" },
          { name: "Formal Trousers", path: "/products/men/formal-trousers" },
          { name: "Shorts", path: "/products/men/shorts" },
          { name: "Track Pants", path: "/products/men/track-pants" },
        ],
      },
      {
        title: "Innerwear & Sleepwear",
        items: [
          { name: "Briefs & Trunks", path: "/products/men/briefs" },
          { name: "Boxers", path: "/products/men/boxers" },
          { name: "Vests", path: "/products/men/vests" },
          { name: "Sleepwear", path: "/products/men/sleepwear" },
          { name: "Thermals", path: "/products/men/thermals" },
        ],
      },
      {
        title: "Footwear",
        items: [
          { name: "Casual Shoes", path: "/products/men/casual-shoes" },
          { name: "Sports Shoes", path: "/products/men/sports-shoes" },
          { name: "Formal Shoes", path: "/products/men/formal-shoes" },
          { name: "Sneakers", path: "/products/men/sneakers" },
          { name: "Sandals & Floaters", path: "/products/men/sandals" },
          { name: "Flip Flops", path: "/products/men/flip-flops" },
          { name: "Socks", path: "/products/men/socks" },
        ],
      },
    ],
  },
  {
    id: "women",
    name: "Women",
    path: "/products/women",
    subcategories: [
      {
        title: "Indian & Fusion Wear",
        items: [
          { name: "Kurtas & Suits", path: "/products/women/kurtas" },
          { name: "Kurtis, Tunics & Tops", path: "/products/women/kurtis" },
          { name: "Sarees", path: "/products/women/sarees" },
          { name: "Ethnic Wear", path: "/products/women/ethnic-wear" },
          {
            name: "Leggings, Salwars & Churidars",
            path: "/products/women/leggings",
          },
          { name: "Skirts & Palazzos", path: "/products/women/skirts" },
          { name: "Dress Materials", path: "/products/women/dress-materials" },
        ],
      },
      {
        title: "Western Wear",
        items: [
          { name: "Dresses", path: "/products/women/dresses" },
          { name: "Tops", path: "/products/women/tops" },
          { name: "Tshirts", path: "/products/women/tshirts" },
          { name: "Jeans", path: "/products/women/jeans" },
          { name: "Trousers & Capris", path: "/products/women/trousers" },
          { name: "Shorts & Skirts", path: "/products/women/shorts" },
          { name: "Co-ords", path: "/products/women/co-ords" },
          { name: "Playsuits", path: "/products/women/playsuits" },
        ],
      },
      {
        title: "Lingerie & Sleepwear",
        items: [
          { name: "Bra", path: "/products/women/bra" },
          { name: "Briefs", path: "/products/women/briefs" },
          { name: "Shapewear", path: "/products/women/shapewear" },
          { name: "Sleepwear & Loungewear", path: "/products/women/sleepwear" },
          { name: "Swimwear", path: "/products/women/swimwear" },
          { name: "Camisoles", path: "/products/women/camisoles" },
        ],
      },
      {
        title: "Footwear",
        items: [
          { name: "Flats", path: "/products/women/flats" },
          { name: "Casual Shoes", path: "/products/women/casual-shoes" },
          { name: "Heels", path: "/products/women/heels" },
          { name: "Boots", path: "/products/women/boots" },
          {
            name: "Sports Shoes & Floaters",
            path: "/products/women/sports-shoes",
          },
        ],
      },
    ],
  },
  {
    id: "kids",
    name: "Kids",
    path: "/products/kids",
    subcategories: [
      {
        title: "Boys Clothing",
        items: [
          { name: "T-Shirts", path: "/products/kids/boys-tshirts" },
          { name: "Shirts", path: "/products/kids/boys-shirts" },
          { name: "Shorts", path: "/products/kids/boys-shorts" },
          { name: "Jeans", path: "/products/kids/boys-jeans" },
          { name: "Trousers", path: "/products/kids/boys-trousers" },
          { name: "Clothing Sets", path: "/products/kids/boys-sets" },
          { name: "Ethnic Wear", path: "/products/kids/boys-ethnic" },
          {
            name: "Track Pants & Pyjamas",
            path: "/products/kids/boys-track-pants",
          },
        ],
      },
      {
        title: "Girls Clothing",
        items: [
          { name: "Dresses", path: "/products/kids/girls-dresses" },
          { name: "Tops", path: "/products/kids/girls-tops" },
          { name: "Tshirts", path: "/products/kids/girls-tshirts" },
          { name: "Clothing Sets", path: "/products/kids/girls-sets" },
          { name: "Lehenga choli", path: "/products/kids/girls-lehenga" },
          { name: "Kurta Sets", path: "/products/kids/girls-kurta" },
          { name: "Party wear", path: "/products/kids/girls-party-wear" },
          {
            name: "Dungarees & Jumpsuits",
            path: "/products/kids/girls-jumpsuits",
          },
        ],
      },
      {
        title: "Footwear",
        items: [
          { name: "Casual Shoes", path: "/products/kids/casual-shoes" },
          { name: "Flipflops", path: "/products/kids/flipflops" },
          { name: "Sports Shoes", path: "/products/kids/sports-shoes" },
          { name: "Flats", path: "/products/kids/flats" },
          { name: "Sandals", path: "/products/kids/sandals" },
          { name: "Heels", path: "/products/kids/heels" },
          { name: "Socks", path: "/products/kids/socks" },
        ],
      },
      {
        title: "Toys & Games",
        items: [
          {
            name: "Learning & Development",
            path: "/products/kids/learning-toys",
          },
          { name: "Activity Toys", path: "/products/kids/activity-toys" },
          { name: "Soft Toys", path: "/products/kids/soft-toys" },
          { name: "Action Figure", path: "/products/kids/action-figures" },
          { name: "Board Games", path: "/products/kids/board-games" },
        ],
      },
    ],
  },
];

interface CategoryDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isMobileTriggered?: boolean;
}

const CategoriesButton: React.FC<CategoryDropdownProps> = ({ 
    isOpen, 
    onClose, 
    activeCategory,
    onMouseEnter,
    onMouseLeave,
    isMobileTriggered = false
  }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("men");
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile triggered dropdown from hamburger menu
  useEffect(() => {
    if (isMobileTriggered) {
      setIsDropdownOpen(isOpen);
    }
  }, [isOpen, isMobileTriggered]);
  
  useEffect(() => {
    // Prevent body scroll when mobile dropdown is open
    if (isMobile && isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isDropdownOpen]);
  

  const currentCategory = categoryData.find(
    (cat) => cat.id === selectedCategory
  );

  const handleMouseEnter = () => {
    if (isMobile || isMobileTriggered) return;
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile || isMobileTriggered) return;
    
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (isMobile || isMobileTriggered) return;
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (isMobile || isMobileTriggered) return;
    setIsDropdownOpen(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    if (onClose) onClose();
  };

  const handleButtonClick = () => {
    if (isMobile && !isMobileTriggered) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleBackdropClick = () => {
    if (isMobile) {
      setIsDropdownOpen(false);
      if (onClose) onClose();
    }
  };

  const handleCloseClick = () => {
    setIsDropdownOpen(false);
    if (onClose) onClose();
  };

  // Don't render the Categories button when triggered from mobile hamburger
  if (isMobileTriggered) {
    return (
      <>
        {/* Mobile Backdrop */}
        {isMobile && isDropdownOpen && (
          <div 
            className={styles.backdrop} 
            onClick={handleBackdropClick}
          />
        )}

        {/* Dropdown */}
        <div
          className={`${styles.dropdown} ${isDropdownOpen ? styles.active : ""} ${
            isMobile ? styles.mobile : ""
          }`}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className={styles.dropdownContent}>
            {/* Mobile Close Button */}
            {isMobile && (
              <div className={styles.mobileHeader}>
                <h2>Categories</h2>
                <button 
                  className={styles.closeButton}
                  onClick={handleCloseClick}
                >
                  <X size={24} />
                </button>
              </div>
            )}

            {/* Categories Section */}
            <div className={styles.categoriesSection}>
              {categoryData.map((category) => (
                <div
                  key={category.id}
                  className={`${styles.categoryItem} ${
                    selectedCategory === category.id ? styles.active : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Link
                    to={category.path}
                    onClick={handleLinkClick}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Subcategories Section */}
            <div className={styles.subcategoriesSection}>
              <div className={styles.subcategoriesGrid}>
                {currentCategory?.subcategories.map((group, index) => (
                  <div key={index} className={styles.subcategoryGroup}>
                    <h3 className={styles.subcategoryTitle}>{group.title}</h3>
                    <ul className={styles.subcategoryList}>
                      {group.items.map((item, itemIndex) => (
                        <li key={itemIndex} className={styles.subcategoryItem}>
                          <Link
                            to={item.path}
                            className={styles.subcategoryLink}
                            onClick={handleLinkClick}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.categoriesContainer}>
      {/* Categories Button */}
      <div
        className={`${styles.categoriesButton} ${
          isDropdownOpen ? styles.active : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}
      >
        <Grid3X3 className={styles.categoriesIcon} />
        <span>Categories</span>
        <ChevronDown className={`${styles.categoriesIcon} ${styles.chevronIcon}`} />
      </div>

      {/* Mobile Backdrop */}
      {isMobile && isDropdownOpen && (
        <div 
          className={styles.backdrop} 
          onClick={handleBackdropClick}
        />
      )}

      {/* Dropdown */}
      <div
        className={`${styles.dropdown} ${isDropdownOpen ? styles.active : ""} ${
          isMobile ? styles.mobile : ""
        }`}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        <div className={styles.dropdownContent}>
          {/* Mobile Close Button */}
          {isMobile && (
            <div className={styles.mobileHeader}>
              <h2>Categories</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setIsDropdownOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
          )}

          {/* Categories Section */}
          <div className={styles.categoriesSection}>
            {categoryData.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedCategory === category.id ? styles.active : ""
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <Link
                  to={category.path}
                  onClick={handleLinkClick}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Subcategories Section */}
          <div className={styles.subcategoriesSection}>
            <div className={styles.subcategoriesGrid}>
              {currentCategory?.subcategories.map((group, index) => (
                <div key={index} className={styles.subcategoryGroup}>
                  <h3 className={styles.subcategoryTitle}>{group.title}</h3>
                  <ul className={styles.subcategoryList}>
                    {group.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={styles.subcategoryItem}>
                        <Link
                          to={item.path}
                          className={styles.subcategoryLink}
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesButton;