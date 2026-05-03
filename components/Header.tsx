import Link from 'next/link';
import styles from './Header.module.css';
import { ShoppingBag, Search, Menu, Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <div className={styles.navLeft}>
          <Link href="/products" className={styles.navLink}>Shop</Link>
          <Link href="/categories" className={styles.navLink}>Categories</Link>
        </div>

        <Link href="/shop" className={styles.logo}>
          MARAN<span>GIFTS</span>
        </Link>

        <div className={styles.navRight}>
          <Link href="/about" className={styles.navLink}>Our Story</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <div className={styles.icons}>
            <Search size={20} strokeWidth={1.5} />
            <Link href="https://wa.me/91XXXXXXXXXX" target="_blank">
              <Phone size={20} strokeWidth={1.5} />
            </Link>
          </div>
          <button className={styles.mobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
