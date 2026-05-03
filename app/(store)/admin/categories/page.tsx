'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from '@/app/(store)/admin/dashboard/Dashboard.module.css';
import { Plus, Trash2, X, Layers, Edit } from 'lucide-react';

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const supabase = createClient();

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
    if (data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category: any) => {
    setIsEditing(true);
    setEditingId(category.id);
    setName(category.name);
    setImage(null); // Reset image input
    setShowAddModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let cover_image = '';
      
      // If editing, keep old image if no new one selected
      if (isEditing && !image) {
        const cat = categories.find(c => c.id === editingId);
        cover_image = cat?.cover_image || '';
      }

      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('category-images').upload(fileName, image);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('category-images').getPublicUrl(fileName);
        cover_image = data.publicUrl;
      }

      const categoryData = { name, cover_image };

      if (isEditing && editingId) {
        const { error } = await supabase.from('categories').update(categoryData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('categories').insert([categoryData]);
        if (error) throw error;
      }
      
      resetForm();
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Failed to save category');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setShowAddModal(false);
    setName('');
    setImage(null);
    setIsEditing(false);
    setEditingId(null);
  };

  const deleteCategory = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    if (imageUrl) {
       const parts = imageUrl.split('/');
       const fileName = parts[parts.length - 1];
       await supabase.storage.from('category-images').remove([fileName]);
    }

    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  };

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.header}>
        <h1>Category Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={20} /> Add Category
        </button>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading categories...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan={3} style={{textAlign: 'center'}}>No categories found.</td></tr>
              ) : categories.map((cat: any) => (
                <tr key={cat.id}>
                  <td>
                    <div className={styles.imgPlaceholder} style={{ background: 'transparent', width: '60px', height: '60px' }}>
                      {cat.cover_image ? (
                        <img src={cat.cover_image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <Layers color="#ccc" />
                      )}
                    </div>
                  </td>
                  <td><b>{cat.name}</b></td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        onClick={() => handleEdit(cat)} 
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
                        onClick={() => deleteCategory(cat.id, cat.cover_image)} 
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
        <div className={styles.modalOverlay} onClick={resetForm}>
           <div className={styles.modal} onClick={e => e.stopPropagation()}>
             <div className={styles.modalHeader}>
                <h2>{isEditing ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={resetForm} className={styles.closeBtn}><X size={24} /></button>
             </div>
             <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label>Category Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Cover Image {isEditing ? '(Leave empty to keep current)' : '(Required)'}</label>
                  <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} required={!isEditing} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={uploading}>
                  {uploading ? 'Saving...' : (isEditing ? 'Update Category' : 'Save Category')}
                </button>
             </form>
           </div>
        </div>
      )}
    </div>
  );
}
