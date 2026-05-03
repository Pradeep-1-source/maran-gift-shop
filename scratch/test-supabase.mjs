import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing connection...');
  const { data, error } = await supabase.from('products').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Products count:', data);
  }

  const { data: catData, error: catError } = await supabase.from('categories').select('*', { count: 'exact', head: true });
  if (catError) {
    console.error('Error fetching categories:', catError);
  } else {
    console.log('Categories count:', catData);
  }
}

test();
