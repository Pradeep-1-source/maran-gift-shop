'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart, Package, Layers, LogOut, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import styles from '@/app/(store)/admin/dashboard/Dashboard.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/admin/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>GIFTKADAI<span>ADMIN</span></div>
      <nav className={styles.nav}>
        <Link 
          href="/admin/dashboard" 
          className={pathname === '/admin/dashboard' ? styles.active : ''}
        >
          <BarChart size={20} /> Overview
        </Link>
        <Link 
          href="/admin/products" 
          className={pathname.startsWith('/admin/products') ? styles.active : ''}
        >
          <Package size={20} /> Products
        </Link>
        <Link 
          href="/admin/categories" 
          className={pathname.startsWith('/admin/categories') ? styles.active : ''}
        >
          <Layers size={20} /> Categories
        </Link>
        <Link 
          href="/admin/custom-orders" 
          className={pathname.startsWith('/admin/custom-orders') ? styles.active : ''}
        >
          <ImageIcon size={20} /> Custom Orders
        </Link>
      </nav>
      <button className={styles.logout} onClick={handleLogout}>
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}
