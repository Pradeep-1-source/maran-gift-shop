import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import Hero from '@/components/Hero';
import ContactSection from '@/components/ContactSection';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <main>
      <Hero />
      
      <FadeIn>
        <section className="section">
          <div className="container">
            <div className={styles.optionsGrid}>
              {/* Photography Option */}
              <a href="https://bigdate.events/akmedias" target="_blank" className={styles.optionCard}>
                <div className={styles.iconWrapper} style={{ padding: '0', overflow: 'hidden' }}>
                  <Image 
                    src="/photography_service_logo_1777820123816.png" 
                    alt="Photography Services Logo" 
                    width={120} 
                    height={120}
                    style={{ objectFit: 'contain' }}
                  />
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
                <div className={styles.iconWrapper} style={{ padding: '0', overflow: 'hidden' }}>
                  <Image 
                    src="/gifts_service_logo_1777820308596.png" 
                    alt="Gift Kadai Logo" 
                    width={120} 
                    height={120}
                    style={{ objectFit: 'contain' }}
                  />
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
      </FadeIn>

      <FadeIn delay={0.2}>
        <ContactSection />
      </FadeIn>
    </main>
  );
}
