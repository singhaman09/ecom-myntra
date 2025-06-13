
import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import styles from './css/Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [value,setValue]=useState('')
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setIsMobileMenuOpen(false);
  };
const handleSubmit=(e:any)=>{
    e.preventDefault()
    navigate(`/${value}`)
    setValue('')
}
  return (
    <header className={styles.header}>
      {/* Top banner */}
      <div className={styles.topBanner}>
        <p className={styles.bannerText}>
          <span className={styles.bannerTextBold}>FLAT ₹200 OFF</span> on first order! Use code: <span className={styles.bannerTextPink}>FIRST200</span>
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
            <div className={styles.logo}>
              <div className={styles.logoText}>
                Wyntra
              </div>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className={styles.nav}>
            <div className={styles.navGroup}>
              <a href="#" className={styles.navLink}>
                Men
              </a>
            </div>
            <div className={styles.navGroup}>
              <a href="#" className={styles.navLink}>
                Women
              </a>
            </div>
            <div className={styles.navGroup}>
              <a href="#" className={styles.navLink}>
                Kids
              </a>
            </div>
            <div className={styles.navGroup}>
              <a href="#" className={styles.navLink}>
                Home & Living
              </a>
            </div>
          </nav>

          {/* Desktop Search Bar */}
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for products, brands and more"
                className={styles.searchInput}
                onChange={(e)=>setValue(e.target.value)}
                value={value}
              />
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
          <div  className={styles.userActions}>
            <div className={styles.userAction} onClick={() => navigate('/profile')}>
              <User  className={styles.userActionIcon} />
              <span className={styles.userActionText}>Profile</span>
            </div>
            <div className={`${styles.userAction} ${styles.bagAction}`} onClick={() => navigate('/wishlist')} >
              <Heart className={styles.userActionIcon} />
              <span className={styles.userActionText}>Wishlist</span>
              <span className={styles.bagBadge}>3</span>
            </div>
            <div className={`${styles.userAction} ${styles.bagAction}`} onClick={() => navigate('/cart')}>
              <ShoppingBag className={styles.userActionIcon} />
              <span className={styles.userActionText}>Bag</span>
              <span className={styles.bagBadge}>0</span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={`${styles.mobileSearch} ${isMobileSearchOpen ? styles.active : ''}`}>
          <div className={styles.mobileSearchWrapper}>
            <Search className={styles.searchIcon} />
           <form onSubmit={handleSubmit}>
           <input
              type="text"
              placeholder="Search for products, brands and more"
              className={styles.searchInput}
              onChange={(e)=>setValue(e.target.value)}
              value={value}
            />
           </form>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <div className={styles.mobileNavLinks}>
            <a href="#" className={styles.mobileNavLink}>Men</a>
            <a href="#" className={styles.mobileNavLink}>Women</a>
            <a href="#" className={styles.mobileNavLink}>Kids</a>
            <a href="#" className={styles.mobileNavLink}>Home & Living</a>
            <a href="#" className={styles.mobileNavLink}>Beauty</a>
            <a href="#" className={styles.mobileNavLink}>Studio</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;