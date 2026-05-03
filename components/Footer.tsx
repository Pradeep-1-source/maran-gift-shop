import styles from './Footer.module.css';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

// Custom Brand Icons as SVGs
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.info}>
          <h2 className={styles.logo}>GIFT<span>KADAI</span></h2>
          <p className={styles.description}>
            Bringing joy and elegance through curated gifts for every special moment in your life.
          </p>
          <div className={styles.socials}>
            <Link href="#"><InstagramIcon size={20} /></Link>
            <Link href="#"><FacebookIcon size={20} /></Link>
            <Link href="#"><TwitterIcon size={20} /></Link>
          </div>
        </div>


        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/products">Shop All</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li style={{ marginTop: '10px' }}><Link href="/admin/login" style={{ color: 'var(--brand-gold)', fontWeight: 'bold' }}>Admin Panel</Link></li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h3>Visit Us</h3>
          <p><MapPin size={16} /> 61, Hospital Street, Hyper Mall Opposite, Thiruthuraipoondi-614713</p>
          <p><Phone size={16} /> +91 79043 73403</p>
          <p><Mail size={16} /> hello@giftkadai.com</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Gift Kadai. All rights reserved.</p>
      </div>
    </footer>
  );
}
