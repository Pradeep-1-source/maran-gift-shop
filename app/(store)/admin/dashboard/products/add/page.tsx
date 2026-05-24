'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AddProduct.module.css';
import { ChevronLeft, Upload, X, Save } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const supabase = createClient();

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [inStock, setInStock] = useState(true);

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Authenticated State & Categories Fetching
  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/admin/login');
          return;
        }
        setAuthChecking(false);

        const { data: cats } = await supabase.from('categories').select('*').order('name');
        if (cats) {
          setCategories(cats);
        }
      } catch (err) {
        console.error('Error authenticating or loading categories:', err);
        setAuthChecking(false);
      }
    }
    checkAuthAndLoadData();
  }, [router, supabase]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
      
      const newUrls = newFiles.map((file: File) => URL.createObjectURL(file));
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
    if (loading) return;

    setLoading(true);

    try {
      const imageUrls: string[] = [];

      // 1. Upload images to Supabase Storage in the 'product-images' bucket
      if (images.length > 0) {
        for (const file of images) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, file);

          if (uploadError) {
            throw new Error(`Failed to upload image: ${uploadError.message}`);
          }

          const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
          if (data?.publicUrl) {
            imageUrls.push(data.publicUrl);
          }
        }
      }

      // 2. Formulate real product payload
      const productData = {
        name,
        price: parseFloat(price),
        compare_price: comparePrice ? parseFloat(comparePrice) : null,
        category_id: categoryId || null,
        description,
        is_customizable: isCustomizable,
        in_stock: inStock,
        images: imageUrls,
      };

      // 3. Save details to Supabase 'products' table
      const { error: insertError } = await supabase.from('products').insert([productData]);
      if (insertError) {
        throw insertError;
      }

      alert('Product saved successfully!');
      router.push('/admin/products');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Verifying administrator access...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/admin/products" className={styles.backBtn}>
          <ChevronLeft size={20} /> Back to Products list
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea 
                  rows={6} 
                  placeholder="Describe the product details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="1499" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Compare Price (₹) - Optional</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="1999" 
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Category</label>
                <select 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
                {previewUrls.map((url: string, i: number) => (
                  <div key={i} className={styles.thumb}>
                    <img src={url} alt="Preview" />
                    <button type="button" onClick={() => removeImage(i)}><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h3>Visibility & Customization</h3>
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  checked={isCustomizable}
                  onChange={(e) => setIsCustomizable(e.target.checked)}
                />
                <span>Is this a Customizable Product? (Allows users to upload photos)</span>
              </label>
              <label className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                />
                <span>In Stock (Uncheck to mark as out of stock)</span>
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
