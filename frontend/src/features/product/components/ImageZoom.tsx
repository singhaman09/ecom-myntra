import React, { useState } from 'react';
import styles from '../styles/ImageZoom.module.css';
import type { ImageZoomOnHoverProps } from '../interfaces/ProductInterfaces';
const ImageZoomOnHover: React.FC<ImageZoomOnHoverProps> = ({
  src,
  alt = '',
  zoomScale = 2,
}) => {
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setZoomStyle({
      backgroundImage: `url(${src})`,
      backgroundSize: `${rect.width * zoomScale}px ${rect.height * zoomScale}px`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundRepeat: 'no-repeat',
      backgroundOrigin: 'content-box',
    });
  };

  return (
    <div
      className={styles.imageZoomContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setZoomStyle({})}
    >
      <img className={styles.zoomImage} src={src} alt={alt} />
     <div className={styles.zoomLens} style={zoomStyle}>
   
     </div>
     </div>
   
  );
};

export default ImageZoomOnHover;
