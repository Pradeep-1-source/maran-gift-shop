import styles from './About.module.css';

export default function AboutPage() {
  return (
    <div className="page-container">
      <section className={styles.hero}>
        <div className="container">
          <h1>Our Story</h1>
          <p>The journey of spreading joy through thoughtful gifting.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <div className={styles.text}>
              <h2>Gift Kadai</h2>
              <p>
                Founded in the heart of Tiruchirappalli, Gift Kadai began with a simple mission: to help people express their love and appreciation through curated, high-quality gifts. 
              </p>
              <p>
                We believe that every gift tells a story. Whether it's a birthday celebration, a wedding anniversary, or a corporate milestone, we are here to provide the perfect token of affection that will be cherished for years to come.
              </p>
              
              <div className={styles.values}>
                <div className={styles.value}>
                  <h3>Quality Promise</h3>
                  <p>We source only the finest products, ensuring every gift meets our premium standards.</p>
                </div>
                <div className={styles.value}>
                  <h3>Local Trust</h3>
                  <p>As a local business, we take pride in serving our community with integrity and care.</p>
                </div>
              </div>
            </div>
            <div className={styles.image}>
              <img src="/hero.png" alt="Our Shop" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
