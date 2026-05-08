import ProductCatalog from "@/components/ProductCatalog";
import styles from "./page.module.css";
import { Gift, Clock, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <section className={styles.shopHeroWrapper}>
        <div className={styles.shopHeroImage}>
          <Image
            src="/hero_gift.jpg"
            alt="Gift Kadai Banner"
            width={1920}
            height={600}
            priority
            className={styles.heroImg}
          />
        </div>
        <div className={styles.shopHeroText}>
          <div className="container">
            <span className={styles.label}>Curated Collection</span>
            <h1>Our Gift Catalog</h1>
            <p>Discover personalized and unique gifts for every special moment.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProductCatalog />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className={styles.featuresGrid}>
            <FadeIn delay={0.1}>
              <div className={styles.featureCard}>
                <Gift size={32} color="var(--brand-purple)" />
                <h3>Premium Quality</h3>
                <p>Hand-picked, high-quality gifts curated for you.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className={styles.featureCard}>
                <Clock size={32} color="var(--brand-purple)" />
                <h3>Fast Delivery</h3>
                <p>Quick delivery across Tamil Nadu and beyond.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className={styles.featureCard}>
                <Truck size={32} color="var(--brand-purple)" />
                <h3>Safe Packaging</h3>
                <p>Ensuring your gifts reach you in perfect condition.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className={styles.featureCard}>
                <ShieldCheck size={32} color="var(--brand-purple)" />
                <h3>Trusted Store</h3>
                <p>Serving our community with love and trust.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WhatsApp Quick Contact */}
      <FadeIn delay={0.1}>
        <section className={styles.quickContact}>
        <div className="container text-center">
          <h2>Looking for something specific?</h2>
          <p>Chat with us on WhatsApp for personalized gift suggestions and bulk orders.</p>
          <a href="https://wa.me/917904373403" target="_blank" className="btn btn-primary">
            Chat on WhatsApp
          </a>
        </div>
      </section>
      </FadeIn>
    </div>
  );
}

