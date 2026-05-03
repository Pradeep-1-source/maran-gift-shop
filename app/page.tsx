import Link from 'next/link';
import styles from './page.module.css';
import { Camera, Gift } from 'lucide-react';
import Hero from '@/components/Hero';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      
      <section className="section">
        <div className="container">
          <div className={styles.optionsGrid}>
            {/* Photography Option */}
            <a href="https://bigdate.events/akmedias" target="_blank" className={styles.optionCard}>
              <div className={styles.iconWrapper}>
                <Camera size={48} strokeWidth={1.5} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.label}>Our Services</span>
                <h2>Photography Services</h2>
                <p>Capture your beautiful moments with AK Medias professional photography.</p>
                <span className={styles.actionLink}>Explore Photography &rarr;</span>
              </div>
            </a>

            {/* Gifts Option */}
            <Link href="/shop" className={styles.optionCard}>
              <div className={styles.iconWrapper}>
                <Gift size={48} strokeWidth={1.5} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.label}>Shop Catalog</span>
                <h2>Explore Gifts</h2>
                <p>Personalized and unique gifts for every unique celebration.</p>
                <span className={styles.actionLink}>Browse Products &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
