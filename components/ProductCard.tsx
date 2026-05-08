import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  category: string;
  inStock?: boolean;
}

export default function ProductCard({ id, name, price, comparePrice, image, category, inStock = true }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/917904373403?text=${encodeURIComponent(`Hi, I'm interested in ${name} from Gift Kadai`)}`;

  return (
    <div className={`${styles.card} ${!inStock ? styles.outOfStockCard : ''}`}>
      <Link href={`/products/${id}`} className={styles.imageLink} style={{ pointerEvents: !inStock ? 'none' : 'auto' }}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={name} style={{ filter: !inStock ? 'grayscale(100%) opacity(0.7)' : 'none' }} />
          {category && <div className={styles.badge}>{category}</div>}
          {!inStock && <div className={styles.outOfStockBadge}>Out of Stock</div>}
        </div>
      </Link>
      
      <div className={styles.info}>
        <Link href={`/products/${id}`} style={{ pointerEvents: !inStock ? 'none' : 'auto' }}>
          <h3 className={styles.title}>{name}</h3>
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{price.toLocaleString()}</span>
          {comparePrice && <span className={styles.comparePrice}>₹{comparePrice.toLocaleString()}</span>}
        </div>
        
        {inStock ? (
          <a href={whatsappUrl} target="_blank" className={styles.whatsappBtn}>
            WhatsApp Enquiry
          </a>
        ) : (
          <button className={styles.whatsappBtnDisabled} disabled>
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );
}
