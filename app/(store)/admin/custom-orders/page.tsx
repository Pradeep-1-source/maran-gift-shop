'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from '@/app/(store)/admin/dashboard/Dashboard.module.css';

export default function CustomOrdersManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('custom_orders').select('*, products(name)').order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.header}>
        <h1>Custom Orders</h1>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading orders...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Customer Image</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={4} style={{textAlign: 'center'}}>No custom orders found.</td></tr>
              ) : orders.map((order: any) => (
                <tr key={order.id}>
                  <td>
                    <div className={styles.imgPlaceholder} style={{ background: 'transparent', width: '60px', height: '60px' }}>
                      <img src={order.customer_uploaded_image} alt="Upload" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                  </td>
                  <td><b>{order.products?.name || 'Unknown'}</b></td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
