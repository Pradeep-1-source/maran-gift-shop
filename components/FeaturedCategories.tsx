import Link from 'next/link';
import styles from './FeaturedCategories.module.css';
import { createClient } from '@/lib/supabase/server';

export default async function FeaturedCategories() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <section className="section bg-secondary">
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">Shop by Category</h2>
          <Link href="/categories" className={styles.viewAll}>View All Categories &rarr;</Link>
        </div>
        
        <div className={styles.grid}>
          {categories && categories.length > 0 ? (
            categories.map((cat: any) => (
              <Link href={`/categories/${cat.id}`} key={cat.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={cat.cover_image || '/cat-birthday.png'} alt={cat.name} />
                </div>
                <div className={styles.info}>
                  <h3>{cat.name}</h3>
                  <span>Browse Collection</span>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }}>
              <p>No categories found. Add some in the admin panel!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
