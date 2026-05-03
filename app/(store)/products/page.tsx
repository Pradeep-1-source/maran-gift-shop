import ProductCard from '@/components/ProductCard';
import styles from './Products.module.css';
import { Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Disable static caching so it always fetches fresh data

export default async function ProductsPage() {
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return (
    <div className="page-container">
      <section className={styles.hero}>
        <div className="container">
          <h1>Explore Our Collection</h1>
          <p>Find something special for your loved ones.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.search}>
              <Search size={20} />
              <input type="text" placeholder="Search products..." />
            </div>
            <div className={styles.filters}>
              <button className={styles.filterBtn}>
                <Filter size={18} /> Filter by Category
              </button>
            </div>
          </div>

          <div className={styles.grid}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images && product.images.length > 0 ? product.images[0] : '/hero.png'}
                  category={product.category || 'Uncategorized'}
                />
              ))
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>
                <p>No products available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
