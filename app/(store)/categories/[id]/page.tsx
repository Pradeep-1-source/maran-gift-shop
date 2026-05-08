import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import styles from './CategoryDetail.module.css';

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (!category) notFound();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', id)
    .order('created_at', { ascending: false });

  return (
    <div className="page-container">
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <Link href="/categories" className={styles.backBtn}>
            <ChevronLeft size={20} /> All Categories
          </Link>
          <h1>{category.name}</h1>
          {category.description && <p>{category.description}</p>}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container">
          {products && products.length > 0 ? (
            <div className={styles.grid}>
              {products.map((product: any) => {
                const image =
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : '/hero.png';
                return (
                  <Link href={`/products/${product.id}`} key={product.id} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <img src={image} alt={product.name} />
                      {product.compare_price && (
                        <span className={styles.badge}>Sale</span>
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <h3>{product.name}</h3>
                      <div className={styles.priceRow}>
                        <span className={styles.price}>₹{product.price?.toLocaleString()}</span>
                        {product.compare_price && (
                          <span className={styles.comparePrice}>₹{product.compare_price?.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No products in this category yet.</p>
              <Link href="/shop" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
