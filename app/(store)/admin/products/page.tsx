'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from '@/app/(store)/admin/dashboard/Dashboard.module.css';
import { Plus, Trash2, X, Image as ImageIcon, Edit, Download } from 'lucide-react';
import Link from 'next/link';

export default function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [prodRes, catRes] = await Promise.all([
       supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }),
       supabase.from('categories').select('*').order('name')
    ]);
    if (prodRes.data) setProducts(prodRes.data);
    if (catRes.data) setCategories(catRes.data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const handleEdit = (product: any) => {
    setIsEditing(true);
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setComparePrice(product.compare_price?.toString() || '');
    setCategoryId(product.category_id || '');
    setDescription(product.description || '');
    setIsCustomizable(product.is_customizable);
    setInStock(product.in_stock ?? true);
    setExistingImages(product.images || []);
    setImages([]);
    setShowAddModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrls: string[] = [...existingImages];

      if (images.length > 0) {
        for (const file of images) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);
          if (uploadError) throw uploadError;
          const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
          imageUrls.push(data.publicUrl);
        }
      }

      const productData = {
        name,
        price: parseFloat(price),
        compare_price: comparePrice ? parseFloat(comparePrice) : null,
        category_id: categoryId || null,
        description,
        is_customizable: isCustomizable,
        in_stock: inStock,
        images: imageUrls,
      };

      if (isEditing && editingId) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }
      
      setShowAddModal(false);
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to save product');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
      setName('');
      setPrice('');
      setComparePrice('');
      setCategoryId('');
      setDescription('');
      setIsCustomizable(false);
      setInStock(true);
      setExistingImages([]);
      setImages([]);
      setIsEditing(false);
      setEditingId(null);
  };

  const deleteProduct = async (id: string, imageUrls: string[]) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    if (imageUrls && imageUrls.length > 0) {
       const paths = imageUrls.map((url: string) => {
          const parts = url.split('/');
          return parts[parts.length - 1];
       });
       await supabase.storage.from('product-images').remove(paths);
    }
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  };

  const exportToCSV = () => {
    if (products.length === 0) return;
    
    const headers = ['ID', 'Name', 'Category', 'Price', 'Compare Price', 'Customizable', 'In Stock', 'Description', 'Images', 'Created At'];
    
    const csvRows = [headers.join(',')];
    
    products.forEach(product => {
      const imageUrls = product.images ? product.images.join(' | ') : '';
      
      const row = [
        product.id,
        `"${(product.name || '').replace(/"/g, '""')}"`,
        `"${(product.categories?.name || 'Uncategorized').replace(/"/g, '""')}"`,
        product.price,
        product.compare_price || '',
        product.is_customizable ? 'Yes' : 'No',
        product.in_stock !== false ? 'Yes' : 'No',
        `"${(product.description || '').replace(/"/g, '""')}"`,
        `"${imageUrls}"`,
        product.created_at
      ];
      csvRows.push(row.join(','));
    });
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `products_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.header}>
        <h1>Product Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={exportToCSV} 
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#f5f5f5', color: '#333', border: '1px solid #ccc', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
            disabled={products.length === 0}
          >
            <Download size={20} /> Export CSV
          </button>
          <button 
            onClick={() => {
              setIsEditing(false);
              resetForm();
              setShowAddModal(true);
            }} 
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
          >
            <Plus size={20} /> Add Product
          </button>
        </div>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Customizable</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign: 'center'}}>No products found.</td></tr>
              ) : products.map((product: any) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.imgPlaceholder} style={{ background: 'transparent', width: '60px', height: '60px' }}>
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <ImageIcon color="#ccc" />
                      )}
                    </div>
                  </td>
                  <td><b>{product.name}</b></td>
                  <td>{product.categories?.name || 'Uncategorized'}</td>
                  <td>₹{product.price} {product.compare_price && <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.9em' }}>₹{product.compare_price}</span>}</td>
                  <td>{product.is_customizable ? '✅ Yes' : '❌ No'}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: 'bold', 
                      backgroundColor: product.in_stock !== false ? '#e8f5e9' : '#ffebee', 
                      color: product.in_stock !== false ? '#2e7d32' : '#c62828' 
                    }}>
                      {product.in_stock !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        onClick={() => handleEdit(product)} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '5px', 
                          background: '#e3f2fd', 
                          color: '#1976d2', 
                          border: '1px solid #bbdefb', 
                          padding: '6px 12px', 
                          borderRadius: '6px', 
                          cursor: 'pointer', 
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id, product.images)} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '5px', 
                          background: '#ffebee', 
                          color: '#d32f2f', 
                          border: '1px solid #ffcdd2', 
                          padding: '6px 12px', 
                          borderRadius: '6px', 
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => { setShowAddModal(false); resetForm(); }}>
           <div className={styles.modal} onClick={e => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
             <div className={styles.modalHeader}>
                <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className={styles.closeBtn}><X size={24} /></button>
             </div>
             <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label>Product Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div className={styles.inputGroup} style={{ flex: 1 }}>
                    <label>Price (₹)</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                  </div>
                  <div className={styles.inputGroup} style={{ flex: 1 }}>
                    <label>Compare Price (₹) - Optional</label>
                    <input type="number" value={comparePrice} onChange={e => setComparePrice(e.target.value)} />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Category</label>
                  <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <option value="">Select a Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={isCustomizable} onChange={e => setIsCustomizable(e.target.checked)} style={{ width: 'auto' }} />
                    Is this a Customizable Product? (Allows users to upload photos)
                  </label>
                </div>

                <div className={styles.inputGroup}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} style={{ width: 'auto' }} />
                    In Stock (Uncheck to mark as out of stock)
                  </label>
                </div>

                <div className={styles.inputGroup}>
                  <label>Description</label>
                  <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
                </div>
                <div className={styles.inputGroup}>
                  <label>Product Images</label>
                  <div className={styles.imageGalleryPreview}>
                    {/* Existing Images (when editing) */}
                    {existingImages.map((url: string, i: number) => (
                      <div key={`old-${i}`} className={styles.previewThumb} style={{ position: 'relative' }}>
                        <img src={url} alt="Existing" />
                        <button type="button" onClick={() => setExistingImages(prev => prev.filter((_, index) => index !== i))} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', padding: 0 }}><X size={12} /></button>
                      </div>
                    ))}
                    
                    {/* New Images */}
                    {images.map((file: File, i: number) => (
                      <div key={`new-${i}`} className={styles.previewThumb} style={{ position: 'relative' }}>
                        <img src={URL.createObjectURL(file)} alt="New" />
                        <button type="button" onClick={() => setImages(prev => prev.filter((_, index) => index !== i))} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', padding: 0 }}><X size={12} /></button>
                      </div>
                    ))}

                    {/* Add Button Placeholder */}
                    <div className={styles.addThumb} onClick={() => document.getElementById('imageInput')?.click()}>
                      <Plus size={24} />
                      <span>Add</span>
                    </div>
                  </div>
                  <input 
                    id="imageInput"
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }}
                  />
                  <small style={{ color: '#666' }}>Click "Add" or the box to select multiple images</small>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '15px' }} disabled={uploading}>
                  {uploading ? 'Processing...' : (isEditing ? 'Update Product' : 'Create Product')}
                </button>
             </form>
           </div>
        </div>
      )}
    </div>
  );
}
