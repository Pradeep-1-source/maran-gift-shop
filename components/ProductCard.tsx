import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, comparePrice, image, category }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/917904373403?text=${encodeURIComponent(`Hi, I'm interested in ${name} from Gift Kadai`)}`;

  return (
    <div className={styles.card}>
      <Link href={`/products/${id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={name} />
          {category && <div className={styles.badge}>{category}</div>}
        </div>
      </Link>
      
      <div className={styles.info}>
        <Link href={`/products/${id}`}>
          <h3 className={styles.title}>{name}</h3>
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{price.toLocaleString()}</span>
          {comparePrice && <span className={styles.comparePrice}>₹{comparePrice.toLocaleString()}</span>}
        </div>
        
        <a href={whatsappUrl} target="_blank" className={styles.whatsappBtn}>
          WhatsApp Enquiry
        </a>
      </div>
    </div>
  );
}
