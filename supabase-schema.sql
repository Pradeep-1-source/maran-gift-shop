-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  cover_image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: If resolving conflicts with an old `products` table, run `DROP TABLE products;` first if you don't mind losing test data.
-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  compare_price numeric,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  images text[] DEFAULT '{}'::text[],
  is_customizable boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Custom Orders Table (for personalized gifts)
CREATE TABLE IF NOT EXISTS public.custom_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  customer_uploaded_image text NOT NULL,
  order_notes text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Tables
-- Public Read Access for catalogs
CREATE POLICY "Public profiles are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);

-- Admin Full Access (If authenticated in Supabase Auth, they can perform CRUD)
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert products" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE USING (auth.role() = 'authenticated');

-- Public can insert custom orders (frontend customer upload), Admin can read
CREATE POLICY "Public can insert custom orders" ON public.custom_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view custom orders" ON public.custom_orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update custom orders" ON public.custom_orders FOR UPDATE USING (auth.role() = 'authenticated');

-- 6. Setup Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('category-images', 'category-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('custom-uploads', 'custom-uploads', true) ON CONFLICT DO NOTHING;

-- 7. Storage Policies
-- Product Images
CREATE POLICY "Public can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Category Images
CREATE POLICY "Public can view category images" ON storage.objects FOR SELECT USING (bucket_id = 'category-images');
CREATE POLICY "Admin can upload category images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'category-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin can delete category images" ON storage.objects FOR DELETE USING (bucket_id = 'category-images' AND auth.role() = 'authenticated');

-- Custom Uploads (Public can upload, Admin can view)
CREATE POLICY "Public can upload custom uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'custom-uploads');
CREATE POLICY "Admin can view custom uploads" ON storage.objects FOR SELECT USING (bucket_id = 'custom-uploads' AND auth.role() = 'authenticated');
