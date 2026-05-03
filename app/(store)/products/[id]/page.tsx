import styles from './ProductDetails.module.css';
import { Phone, ChevronLeft, Heart, Share2, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductCustomizer from '@/components/ProductCustomizer';

export const revalidate = 0;

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: product } = await supabase.from('products').select('*, categories(name)').eq('id', id).single();

  if (!product) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/917904373403?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} from Maran Gifts`)}`;

  const images = product.images && product.images.length > 0 ? product.images : ['/hero.png'];

  return (
    <div className="page-container">
      <section className="section">
        <div className="container">
          <Link href="/shop" className={styles.backBtn}>
            <ChevronLeft size={20} /> Back to Catalog
          </Link>

          <div className={styles.layout}>
            {/* Image Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImage}>
                <img src={images[0]} alt={product.name} />
              </div>
              {images.length > 1 && (
                <div className={styles.thumbnails}>
                  {images.map((img: string, i: number) => (
                    <div key={i} className={styles.thumb}>
                      <img src={img} alt={`Thumb ${i}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <span className={styles.category}>{product.categories?.name || 'Handmade Gift'}</span>
              <h1 className={styles.title}>{product.name}</h1>
              
              <div className={styles.priceRow}>
                <span className={styles.price}>₹{product.price.toLocaleString()}</span>
                {product.compare_price && <span className={styles.comparePrice}>₹{product.compare_price.toLocaleString()}</span>}
              </div>
              
              <div className={styles.description}>
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Customization Feature */}
              {product.is_customizable && (
                <ProductCustomizer productName={product.name} />
              )}

              <div className={styles.actions}>
                <a href={whatsappUrl} target="_blank" className={styles.whatsappAction}>
                  <Phone size={20} />
                  WhatsApp Enquiry
                </a>
                <button className={styles.iconBtn} title="Add to Wishlist"><Heart size={22} /></button>
                <button className={styles.iconBtn} title="Share"><Share2 size={22} /></button>
              </div>

              <div className={styles.trustBadges}>
                <div className={styles.badgeItem}>
                  <Truck size={20} />
                  <span>Fast Delivery</span>
                </div>
                <div className={styles.badgeItem}>
                  <ShieldCheck size={20} />
                  <span>Quality Guarantee</span>
                </div>
              </div>
              
              <div className={styles.contactInfo}>
                <p><strong>Maran Gifts</strong> - Karthik Maran.R</p>
                <p>AK Medias, 61, Hospital Street, Thiruthuraipoondi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
