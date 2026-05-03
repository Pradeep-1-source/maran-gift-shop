'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SetupAdmin() {
  // If Supabase strict email is on, this might fail without .com. 
  // If it fails, users can manually append it or create the user in the portal.
  const [email, setEmail] = useState('akmedias403@gmail.com');
  const [password, setPassword] = useState('1akmedias@2026');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setStatus('Registering securely...');
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
       setStatus(`Error: ${error.message}`);
    } else {
       setStatus('Success! Registration complete. You can now login.');
       setTimeout(() => router.push('/admin/login'), 2000);
    }
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>One-Time Admin Setup</h1>
      <p style={{ marginTop: '10px', color: '#666' }}>
        This will create your secure admin account in Supabase Authentication.
      </p>
      
      <div style={{ textAlign: 'left', marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Email</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Password</label>
          <input 
            type="text" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
      </div>

      <button 
        onClick={handleRegister} 
        className="btn btn-primary" 
        style={{ marginTop: '30px', width: '100%' }}
      >
        Register Secure Admin
      </button>

      {status && (
        <div style={{ marginTop: '20px', padding: '15px', borderRadius: '5px', background: status.startsWith('Error') ? '#ffebee' : '#e8f5e9', color: status.startsWith('Error') ? '#c62828' : '#2e7d32' }}>
          {status}
        </div>
      )}
    </div>
  );
}
