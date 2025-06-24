import { useEffect, useState, useRef, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './css/HeroSection.module.css';

// Slide type for the carousel
type Slide = {
  id: string;
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
};

const HeroSection = ({ slides }: { slides: Slide[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef<number | null>(null);

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Jump to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Start or stop auto sliding based on hover
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    // Clear the interval when unmounting or on pause
    return () => {
      if (slideInterval.current !== null) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPaused, nextSlide]);

  // Swipe support for mobile and desktop
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      className={styles.hero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...swipeHandlers}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
        >
          <img
            loading="lazy"
            src={slide.backgroundImage}
            alt={slide.title}
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h2 className={styles.title}>{slide.title}</h2>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <button className={styles.button} onClick={slide.onButtonClick}>
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
