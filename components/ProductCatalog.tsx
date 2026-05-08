'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Gift, LayoutGrid } from 'lucide-react';
import styles from './ProductCatalog.module.css';
import { createClient } from '@/lib/supabase/client';
import FadeIn from './FadeIn';

export default function ProductCatalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ]);

      if (prodRes.data) setProducts(prodRes.data);
      if (catRes.data) setCategories(catRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category_id === selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <button 
          className={`${styles.categoryItem} ${selectedCategory === 'all' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          <div className={styles.categoryImage}>
            <div className={styles.allGiftsIcon}>
              <LayoutGrid size={28} />
            </div>
          </div>
          <span className={styles.categoryName}>All Gifts</span>
        </button>

        {categories.map((cat: any) => (
          <button 
            key={cat.id}
            className={`${styles.categoryItem} ${selectedCategory === cat.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <div className={styles.categoryImage}>
              <img 
                src={cat.cover_image || '/cat-birthday.png'} 
                alt={cat.name} 
              />
            </div>
            <span className={styles.categoryName}>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {loading ? (
          <div className={styles.loader}>Loading items...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product: any, index: number) => (
            <FadeIn key={product.id} delay={index * 0.05}>
              <ProductCard 
                id={product.id}
                name={product.name}
                price={product.price}
                comparePrice={product.compare_price}
                image={product.images?.[0] || '/cat-birthday.png'}
                category={product.categories?.name || ''}
                inStock={product.in_stock ?? true}
              />
            </FadeIn>
          ))
        ) : (
          <div className={styles.empty}>No products found in this category.</div>
        )}
      </div>
    </div>
  );
}
