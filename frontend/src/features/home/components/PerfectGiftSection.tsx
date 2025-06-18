import styles from './css/PerfectGiftSection.module.css';

const PerfectGiftSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>FIND THE PERFECT GIFT</h2>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua sed do eiusmod tempor.
          </p>
          <button className={styles.shopButton}>SHOP NOW</button>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop"
            alt="Perfect Gift"
            className={styles.giftImage}
          />
        </div>
      </div>
    </section>
  );
};

export default PerfectGiftSection;