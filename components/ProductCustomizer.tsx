'use client';

import { useState, useRef } from 'react';
import styles from './ProductCustomizer.module.css';
import { Upload, X } from 'lucide-react';

interface ProductCustomizerProps {
  productName: string;
}

export default function ProductCustomizer({ productName }: ProductCustomizerProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={styles.customizer}>
      <div className={styles.header}>
        <h3>Customize your {productName}</h3>
        <p>Upload a photo to see a live preview</p>
      </div>

      <div className={styles.uploadArea}>
        {!previewImage ? (
          <div className={styles.dropzone} onClick={() => fileInputRef.current?.click()}>
            <Upload size={32} />
            <span>Click to upload photo</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>
        ) : (
          <div className={styles.previewContainer}>
             <button className={styles.removeBtn} onClick={handleRemove}><X size={16} /></button>
             {/* Mockup Preview Logic */}
             <div className={styles.mockupWrapper}>
                {/* Background Mockup (Generic Frame or Keychain) */}
                <div className={styles.mockupBg}>
                  <div className={styles.userPhotoOverlay}>
                    <img src={previewImage} alt="User upload" />
                  </div>
                  {/* Glass or Frame effect overlay */}
                  <div className={styles.glassEffect}></div>
                </div>
                <p className={styles.previewLabel}>Live Preview</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
