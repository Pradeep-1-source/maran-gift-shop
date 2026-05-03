import ProductCard from './ProductCard';
import styles from './Bestsellers.module.css';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Bestsellers() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title text-center" style={{ marginBottom: '50px' }}>Latest Products</h2>
        <div className={styles.grid}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images && product.images.length > 0 ? product.images[0] : '/cat-birthday.png'}
                category={product.category || 'Uncategorized'}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No products available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
