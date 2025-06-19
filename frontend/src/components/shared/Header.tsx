import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import styles from "./css/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import CategoryDropdown from "./CategoryDropDown";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [activeCategoryHover, setActiveCategoryHover] = useState<string>("");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const navigate = useNavigate();

  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setIsMobileMenuOpen(false);
  };

  const handleBagClick = () => {
    navigate("/cart");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/products/${value}`);
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
    navigate(`/products/${suggestion}`);
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
  };

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
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              <Link to="/products/men" className={styles.navLink}>
                Men
              </Link>
            </div>
            <div
              className={styles.navGroup}
              onMouseEnter={() => handleCategoryHover("women")}
              onMouseLeave={handleCategoryLeave}
            >
              <Link to="/products/women" className={styles.navLink}>
                Women
              </Link>
            </div>
            <div
              className={styles.navGroup}
              onMouseEnter={() => handleCategoryHover("kids")}
              onMouseLeave={handleCategoryLeave}
            >
              <Link to="/products/kids" className={styles.navLink}>
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

          {/* Desktop Search Bar */}
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

          {/* Mobile Search Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileSearch}
          >
            <Search size={20} />
          </button>

          {/* User Actions */}
          <div className={styles.userActions}>
            <div
              className={styles.userAction}
              onClick={() => navigate("/profile")}
            >
              <User className={styles.userActionIcon} />
              <span className={styles.userActionText}>Profile</span>
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
              <span className={styles.bagBadge}>0</span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div
          className={`${styles.mobileSearch} ${
            isMobileSearchOpen ? styles.active : ""
          }`}
          style={{ position: "relative" }}
        >
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

        {/* Mobile Navigation */}
        <div
          className={`${styles.mobileNav} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
        >
          <div className={styles.mobileNavLinks}>
            <Link to="/products/men" className={styles.mobileNavLink}>
              Men
            </Link>
            <Link to="/products/women" className={styles.mobileNavLink}>
              Women
            </Link>
            <Link to="/products/kids" className={styles.mobileNavLink}>
              Kids
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
