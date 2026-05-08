'use client';

import { useState } from 'react';
import styles from '../app/(store)/products/[id]/ProductDetails.module.css';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={images[activeIndex]}
          alt={productName}
          style={{ transition: 'opacity 0.25s ease' }}
        />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, i) => (
            <div
              key={i}
              className={styles.thumb}
              onClick={() => setActiveIndex(i)}
              style={{
                borderColor: i === activeIndex ? 'var(--brand-gold)' : 'transparent',
                opacity: i === activeIndex ? 1 : 0.65,
              }}
            >
              <img src={img} alt={`${productName} view ${i + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
