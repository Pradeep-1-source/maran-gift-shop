'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AddProduct.module.css';
import { ChevronLeft, Upload, Plus, X, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isFeatured: false,
    isBestseller: false,
    colors: [] as string[],
    sizes: [] as string[],
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) router.push('/admin/login');
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
      
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedUrls = [...previewUrls];
    updatedUrls.splice(index, 1);
    setPreviewUrls(updatedUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app: 
    // 1. Upload images to Supabase Storage
    // 2. Save product details to Supabase 'products' table
    
    console.log('Product Data:', product);
    console.log('Images to upload:', images);

    setTimeout(() => {
      alert('Product Added Successfully! (Simulation)');
      setLoading(false);
      router.push('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/admin/dashboard" className={styles.backBtn}>
          <ChevronLeft size={20} /> Back to Dashboard
        </Link>
        <h1>Add New Product</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* Left Column: Basic Info */}
          <div className={styles.mainInfo}>
            <div className={styles.card}>
              <h3>Basic Information</h3>
              <div className={styles.inputGroup}>
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Elegant Flower Box" 
                  value={product.name}
                  onChange={(e) => setProduct({...product, name: e.target.value})}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea 
                  rows={6} 
                  placeholder="Describe the product details..."
                  value={product.description}
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                  required
                />
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="1499" 
                    value={product.price}
                    onChange={(e) => setProduct({...product, price: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Category</label>
                  <select 
                    value={product.category}
                    onChange={(e) => setProduct({...product, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="custom">Custom</option>
                    <option value="baby">Baby Gifts</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3>Product Variants</h3>
              <div className={styles.inputGroup}>
                <label>Colors (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="Gold, Pink, Red" 
                  onChange={(e) => setProduct({...product, colors: e.target.value.split(',').map(s => s.trim())})}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Sizes (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="Small, Medium, Large" 
                  onChange={(e) => setProduct({...product, sizes: e.target.value.split(',').map(s => s.trim())})}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Images & Settings */}
          <div className={styles.sideInfo}>
            <div className={styles.card}>
              <h3>Product Images</h3>
              <div className={styles.imageUpload}>
                <label className={styles.dropzone}>
                  <Upload size={32} />
                  <span>Click to upload images</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} hidden />
                </label>
              </div>
              <div className={styles.previews}>
                {previewUrls.map((url, i) => (
                  <div key={i} className={styles.thumb}>
                    <img src={url} alt="Preview" />
                    <button type="button" onClick={() => removeImage(i)}><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h3>Visibility Settings</h3>
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  checked={product.isFeatured}
                  onChange={(e) => setProduct({...product, isFeatured: e.target.checked})}
                />
                <span>Set as Featured Product</span>
              </label>
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  checked={product.isBestseller}
                  onChange={(e) => setProduct({...product, isBestseller: e.target.checked})}
                />
                <span>Set as Bestseller</span>
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Saving...' : <><Save size={20} /> Save Product</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
