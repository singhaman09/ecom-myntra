
import React from 'react';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import styles from './css/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.container}>
        <div className={styles.mainContent}>
          {/* Online Shopping */}
          <div className={styles.section}>
            <h3>Online Shopping</h3>
            <ul className={styles.linkList}>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Home & Living</a></li>
              <li><a href="#">Beauty</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Myntra Insider</a></li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div className={styles.section}>
            <h3>Customer Policies</h3>
            <ul className={styles.linkList}>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">T&C</a></li>
              <li><a href="#">Terms Of Use</a></li>
              <li><a href="#">Track Orders</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Cancellation</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Grievance Officer</a></li>
            </ul>
          </div>

          {/* Experience Myntra App */}
          <div className={styles.section}>
            <h3>Experience Myntra App On Mobile</h3>
            <div className={styles.appLinks}>
              <div className={styles.appStores}>
                <img src="/placeholder.svg" alt="Google Play" className={styles.appStore} />
                <img src="/placeholder.svg" alt="App Store" className={styles.appStore} />
              </div>
            </div>
            
            <div className={styles.socialSection}>
              <h3>Keep In Touch</h3>
              <div className={styles.socialIcons}>
                <Facebook className={`${styles.socialIcon} ${styles.facebook}`} />
                <Twitter className={`${styles.socialIcon} ${styles.twitter}`} />
                <Youtube className={`${styles.socialIcon} ${styles.youtube}`} />
                <Instagram className={`${styles.socialIcon} ${styles.instagram}`} />
              </div>
            </div>
          </div>

          {/* Guarantee Section */}
          <div className={styles.section}>
            <div className={styles.guaranteeSection}>
              <div className={styles.guaranteeItem}>
                <div className={styles.guaranteeIcon}>
                  <span>100%</span>
                </div>
                <div className={styles.guaranteeText}>
                  <h4>100% ORIGINAL</h4>
                  <p>guarantee for all products at myntra.com</p>
                </div>
              </div>
              
              <div className={styles.guaranteeItem}>
                <div className={styles.guaranteeIcon}>
                  <span>30</span>
                </div>
                <div className={styles.guaranteeText}>
                  <h4>Return within 30days</h4>
                  <p>of receiving your order</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className={styles.popularSearches}>
          <h3>Popular Searches</h3>
          <div className={styles.searchTags}>
            <span>Makeup</span> | 
            <span> Dresses For Girls</span> | 
            <span> T-Shirts</span> | 
            <span> Sandals</span> | 
            <span> Headphones</span> | 
            <span> Babydolls</span> | 
            <span> Blazers For Men</span> | 
            <span> Handbags</span> | 
            <span> Ladies Watches</span> | 
            <span> Bags</span> | 
            <span> Sport Shoes</span> | 
            <span> Reebok Shoes</span> | 
            <span> Puma Shoes</span> | 
            <span> Boxers</span> | 
            <span> Wallets</span> | 
            <span> Tops</span> | 
            <span> Earrings</span> | 
            <span> Fastrack Watches</span> | 
            <span> Kurtis</span> | 
            <span> Nike</span> | 
            <span> Smart Watches</span> | 
            <span> Titan Watches</span> | 
            <span> Designer Blouse</span> | 
            <span> Gowns</span> | 
            <span> Rings</span> | 
            <span> Cricket Shoes</span> | 
            <span> Forever 21</span> | 
            <span> Eye Makeup</span> | 
            <span> Photo Frames</span> | 
            <span> Punjabi Suits</span> | 
            <span> Bikini</span> | 
            <span> Myntra Fashion Show</span> | 
            <span> Lipstick</span> | 
            <span> Saree</span> | 
            <span> Watches</span> | 
            <span> Dresses</span> | 
            <span> Lehenga</span> | 
            <span> Nike Shoes</span> | 
            <span> Goggles</span> | 
            <span> Bras</span> | 
            <span> Suit</span> | 
            <span> Chinos</span> | 
            <span> Shoes</span> | 
            <span> Adidas Shoes</span> | 
            <span> Woodland Shoes</span> | 
            <span> Jewellery</span> | 
            <span> Designers Sarees</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={styles.bottomFooter}>
        <div className={styles.bottomContent}>
          <div className={styles.bottomMain}>
            <div className={styles.contactInfo}>
              <span>In case of any concern, <a href="#" className={styles.contactLink}>Contact Us</a></span>
            </div>
            <div className={styles.copyright}>
              © 2024 www.myntra.com. All rights reserved.
            </div>
          </div>
          
          <div className={styles.companyInfo}>
            <p>A Flipkart company</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;