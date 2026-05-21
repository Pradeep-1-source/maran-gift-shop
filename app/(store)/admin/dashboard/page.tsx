import { createClient } from '@/lib/supabase/server';
import styles from './Dashboard.module.css';
import { Package, Layers, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardOverview() {
  const supabase = await createClient();

  const [{ count: productsCount }, { count: categoriesCount }, { count: customOrdersCount }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('custom_orders').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div>
      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
      </div>
      <p style={{ color: '#666', marginTop: '-10px', marginBottom: '30px' }}>
        Welcome back to the Gift Kadai Admin Panel. Here's what's happening today.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Link href="/admin/products" className={styles.metricCard}>
          <Package size={40} color="var(--brand-gold)" />
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{productsCount || 0}</h2>
            <p style={{ margin: 0, color: '#666' }}>Total Products</p>
          </div>
        </Link>

        <Link href="/admin/categories" className={styles.metricCard}>
          <Layers size={40} color="var(--brand-gold)" />
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{categoriesCount || 0}</h2>
            <p style={{ margin: 0, color: '#666' }}>Categories</p>
          </div>
        </Link>

        <Link href="/admin/custom-orders" className={styles.metricCard}>
          <ImageIcon size={40} color="var(--brand-gold)" />
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{customOrdersCount || 0}</h2>
            <p style={{ margin: 0, color: '#666' }}>Custom Orders</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
