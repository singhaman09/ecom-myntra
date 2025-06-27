import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import styles from "./css/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { PRODUCT_ROUTES } from "../../features/product/Constants/Routes";
import { useAppSelector } from "../../features/order/hooks/redux";

// Lazy load the CategoryDropdown to improve initial load time
const CategoryDropdown = lazy(() => import("./CategoryDropDown"));
// Sample suggestions for search bar
const dummySuggestions = [
  "Shoes", "T-Shirts", "Jackets", "Jeans", "Watches",
  "Bags", "Sunglasses", "Hats", "Belts", "Shorts"
];

// Memoized Header component for performance
const Header: React.FC = React.memo(() => {
  const { items } = useAppSelector((state) => state.wishlist);
  const totalItems = items.length;
  const totalItemsBag = 10;
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [activeCategoryHover, setActiveCategoryHover] = useState<string>("");
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Toggle mobile category dropdown
  const toggleMobileCategory = useCallback(() => {
    setIsMobileCategoryOpen(prev => !prev);
  }, []);

  // Navigate to cart page
  const handleBagClick = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  // Search submit handler
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`${PRODUCT_ROUTES.list}/${value}`);
      setValue("");
      setIsSuggestionsOpen(false);
    }
  }, [value, navigate]);

  // Handle typing in the search input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (val.trim().length > 0) {
      const filtered = dummySuggestions.filter(s =>
        s.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setIsSuggestionsOpen(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setValue(suggestion);
    setIsSuggestionsOpen(false);
    navigate(`${PRODUCT_ROUTES.list}/${suggestion}`);
  }, [navigate]);

  // Hover event for category links (desktop)
  const handleCategoryHover = useCallback((category: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveCategoryHover(category);
    setIsCategoryDropdownOpen(true);
  }, [hoverTimeout]);

  // Hide dropdown after delay
  const handleCategoryLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsCategoryDropdownOpen(false);
      setActiveCategoryHover("");
    }, 250);
    setHoverTimeout(timeout);
  }, []);

  // Cancel dropdown close on mouse enter
  const handleDropdownEnter = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [hoverTimeout]);

  // Immediately close dropdown on leave
  const handleDropdownLeave = useCallback(() => {
    setIsCategoryDropdownOpen(false);
    setActiveCategoryHover("");
  }, []);

  // Close both dropdowns
  const handleDropdownClose = useCallback(() => {
    setIsCategoryDropdownOpen(false);
    setActiveCategoryHover("");
    setIsMobileCategoryOpen(false);
  }, []);

  // Handle profile click: if logged in go to profile else toggle dropdown
  const handleProfileClick = useCallback(() => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      setIsProfileDropdownOpen(prev => !prev);
    }
  }, [isAuthenticated, navigate]);

  // Navigate to Sign In
  const handleSignIn = useCallback(() => {
    setIsProfileDropdownOpen(false);
    navigate("/login");
  }, [navigate]);

  // Navigate to Sign Up
  const handleSignUp = useCallback(() => {
    setIsProfileDropdownOpen(false);
    navigate("/signup");
  }, [navigate]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".profile-container")) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <header className={styles.header}>
      {/* Top banner with discount message */}
      <div className={styles.topBanner}>
        <p className={styles.bannerText}>
          <span className={styles.bannerTextBold}>FLAT ₹200 OFF</span> on first order! Use code:{" "}
          <span className={styles.bannerTextPink}>FIRST200</span>
        </p>
      </div>
      <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Hamburger icon and logo */}
          <div className={styles.hamLogo}>
            <button className={styles.mobileMenuButton} onClick={toggleMobileCategory}>
              {isMobileCategoryOpen ? <X size={20} /> : <Menu size={20} color="white" />}
            </button>

            <div className={styles.logo} onClick={() => navigate("/")}>
              <div className={styles.logoText}>Wyntra</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {["men", "women", "kids"].map(category => (
              <div
                key={category}
                className={styles.navGroup}
                onMouseEnter={() => handleCategoryHover(category)}
                onMouseLeave={handleCategoryLeave}
              >
                <Link to={`${PRODUCT_ROUTES.list}/${category}`} className={styles.navLink}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </div>
            ))}
            <Suspense fallback={null}>
              <CategoryDropdown
                isOpen={isCategoryDropdownOpen}
                onClose={handleDropdownClose}
                activeCategory={activeCategoryHover}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              />
            </Suspense>
          </nav>

          {/* Search bar (desktop/tablet) */}
          <div className={styles.searchContainer} style={{ position: "relative" }}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <form onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className={styles.searchInput}
                  onChange={handleInputChange}
                  value={value}
                  onFocus={() => value && setIsSuggestionsOpen(true)}
                  onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 120)}
                />
                {isSuggestionsOpen && suggestions.length > 0 && (
                  <ul className={styles.suggestionsList}>
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className={styles.suggestionItem}
                        onMouseDown={() => handleSuggestionClick(s)}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>
          </div>

          {/* Right side user actions */}
          <div className={styles.userActions}>
          {/* Profile */}
          <div className={`${styles.userAction}`} onClick={handleProfileClick}>
            <div className={styles.iconWrapper}>
              <User className={styles.userActionIcon} />
            </div>
            <span className={styles.userActionText}>Profile</span>
            {!isAuthenticated && isProfileDropdownOpen && (
              <div className={styles.profileDropdown}>
                <div className={styles.dropdownItem} onMouseDown={handleSignIn}>Sign In</div>
                <div className={styles.dropdownItem} onMouseDown={handleSignUp}>Sign Up</div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div className={`${styles.userAction}`} onClick={() => navigate("/wishlist")}>
            <div className={styles.iconWrapper}>
              <Heart className={styles.userActionIcon} />
              {totalItems > 0 && (
                <span className={styles.bagBadge}>{totalItems}</span>
              )}
            </div>
            <span className={styles.userActionText}>Wishlist</span>
          </div>

          {/* Shopping Bag */}
          <div className={`${styles.userAction}`} onClick={handleBagClick}>
            <div className={styles.iconWrapper}>
              <ShoppingBag className={styles.userActionIcon} />
              {totalItemsBag > 0 && (
                <span className={styles.bagBadge}>{totalItemsBag}</span>
              )}
            </div>
            <span className={styles.userActionText}>Bag</span>
          </div>
        </div>

        </div>

        {/* Mobile search input */}
        <div className={styles.mobileSearch} style={{ position: "relative" }}>
          <div className={styles.mobileSearchWrapper}>
            <Search className={styles.searchIcon} />
            <form onSubmit={handleSubmit} autoComplete="off">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className={styles.searchInput}
                onChange={handleInputChange}
                value={value}
                onFocus={() => value && setIsSuggestionsOpen(true)}
                onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 120)}
              />
              {isSuggestionsOpen && suggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className={styles.suggestionItem}
                      onMouseDown={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        </div>

        {/* Mobile Category Menu */}
        <Suspense fallback={null}>
          <CategoryDropdown
            isOpen={isMobileCategoryOpen}
            onClose={handleDropdownClose}
            activeCategory=""
            isMobileTriggered={true}
          />
        </Suspense>
      </div>
      </div>
    </header>
  );
});

export default Header;
