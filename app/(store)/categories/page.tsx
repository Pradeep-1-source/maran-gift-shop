import Link from 'next/link';
import styles from './Categories.module.css';
import { createClient } from '@/lib/supabase/server';

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*, products(count)')
    .order('name');

  return (
    <div className="page-container">
      <section className={styles.hero}>
        <div className="container">
          <h1>Browse by Category</h1>
          <p>Find the perfect gift for every unique celebration.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {categories && categories.length > 0 ? (
              categories.map((cat: any) => (
                <Link href={`/categories/${cat.id}`} key={cat.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img src={cat.cover_image || '/cat-birthday.png'} alt={cat.name} />
                    <div className={styles.count}>{cat.products?.[0]?.count || 0} Items</div>
                  </div>
                  <h3>{cat.name}</h3>
                </Link>
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }}>
                <p>No categories found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
