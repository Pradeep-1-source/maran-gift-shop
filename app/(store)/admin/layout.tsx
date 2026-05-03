'use client';

import AdminSidebar from '@/components/AdminSidebar';
import styles from './dashboard/Dashboard.module.css';
import { usePathname } from 'next/navigation';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/setup';

  return (
    <div className={styles.dashboard}>
      {!isAuthPage && <AdminSidebar />}
      <main className={isAuthPage ? '' : styles.content} style={isAuthPage ? { width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}}>
        {children}
      </main>
    </div>
  );
}
