import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import styles from "./css/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import CategoryDropdown from "./CategoryDropDown";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { PRODUCT_ROUTES } from "../../features/product/Constants/Routes";

const dummySuggestions = [
  "Shoes",
  "T-Shirts",
  "Jackets",
  "Jeans",
  "Watches",
  "Bags",
  "Sunglasses",
  "Hats",
  "Belts",
  "Shorts"
];

const Header: React.FC = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [activeCategoryHover, setActiveCategoryHover] = useState<string>("");
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleMobileCategory = () => {
    setIsMobileCategoryOpen(!isMobileCategoryOpen);
  };

  const handleBagClick = () => {
    navigate("/cart");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`${PRODUCT_ROUTES.list}/${value}`);
      setValue("");
      setIsSuggestionsOpen(false);
    }
  };

  // --- Search Suggestion Logic ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setIsSuggestionsOpen(false);
    navigate(`${PRODUCT_ROUTES.list}/${suggestion}`);
  };

  // --- Category Dropdown Logic ---
  const handleCategoryHover = (category: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveCategoryHover(category);
    setIsCategoryDropdownOpen(true);
  };

  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setIsCategoryDropdownOpen(false);
      setActiveCategoryHover("");
    }, 250);
    setHoverTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownLeave = () => {
    setIsCategoryDropdownOpen(false);
    setActiveCategoryHover("");
  };

  const handleDropdownClose = () => {
    setIsCategoryDropdownOpen(false);
    setActiveCategoryHover("");
    setIsMobileCategoryOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    }
  };

  const handleSignIn = () => {
    setIsProfileDropdownOpen(false);
    navigate("/login");
  };

  const handleSignUp = () => {
    setIsProfileDropdownOpen(false);
    navigate("/signup");
  };

  // Close profile dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-container')) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <header className={styles.header}>
      {/* Top banner */}
      <div className={styles.topBanner}>
        <p className={styles.bannerText}>
          <span className={styles.bannerTextBold}>FLAT ₹200 OFF</span> on first
          order! Use code:{" "}
          <span className={styles.bannerTextPink}>FIRST200</span>
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.hamLogo}>
            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileCategory}
            >
              {isMobileCategoryOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <div className={styles.logo} onClick={() => navigate("/")}>
              <div className={styles.logoText}>Wyntra</div>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className={styles.nav}>
            <div
              className={styles.navGroup}
              onMouseEnter={() => handleCategoryHover("men")}
              onMouseLeave={handleCategoryLeave}
            >
              <Link to={`${PRODUCT_ROUTES.list}/men`} className={styles.navLink}>
                Men
              </Link>
            </div>
            <div
              className={styles.navGroup}
              onMouseEnter={() => handleCategoryHover("women")}
              onMouseLeave={handleCategoryLeave}
            >
              <Link to={`${PRODUCT_ROUTES.list}/women`} className={styles.navLink}>
                Women
              </Link>
            </div>
            <div
              className={styles.navGroup}
              onMouseEnter={() => handleCategoryHover("kids")}
              onMouseLeave={handleCategoryLeave}
            >
              <Link to={`${PRODUCT_ROUTES.list}/kids`} className={styles.navLink}>
                Kids
              </Link>
            </div>

            <div>
              <CategoryDropdown
                isOpen={isCategoryDropdownOpen}
                onClose={handleDropdownClose}
                activeCategory={activeCategoryHover}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              />
            </div>
          </nav>

          {/* Desktop & Tablet Search Bar */}
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

          {/* User Actions */}
          <div className={styles.userActions}>
            <div
              className={`${styles.userAction} profile-container`}
              onClick={handleProfileClick}
              style={{ position: 'relative' }}
            >
              <User className={styles.userActionIcon} />
              <span className={styles.userActionText}>Profile</span>
              
              {/* Profile Dropdown for Unauthenticated Users */}
              {!isAuthenticated && isProfileDropdownOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.dropdownItem} onClick={handleSignIn}>
                    Sign In
                  </div>
                  <div className={styles.dropdownItem} onClick={handleSignUp}>
                    Sign Up
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${styles.userAction} ${styles.bagAction}`}
              onClick={() => navigate("/wishlist")}
            >
              <Heart className={styles.userActionIcon} />
              <span className={styles.userActionText}>Wishlist</span>
              <span className={styles.bagBadge}>3</span>
            </div>
            <div
              className={`${styles.userAction} ${styles.bagAction}`}
              onClick={handleBagClick}
            >
              <ShoppingBag className={styles.userActionIcon} />
              <span className={styles.userActionText}>Bag</span>
              <span className={styles.bagBadge}>3</span>
            </div>
          </div>
        </div>

        {/* Mobile Search - Always visible */}
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

        {/* Mobile Category Dropdown */}
        <div>
          <CategoryDropdown
            isOpen={isMobileCategoryOpen}
            onClose={handleDropdownClose}
            activeCategory=""
            isMobileTriggered={true}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;