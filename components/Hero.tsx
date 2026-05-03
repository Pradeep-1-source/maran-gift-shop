import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <h1 className={styles.title}>
          Gift Kadai – <br />
          <span>Make Every Moment Special 🎁</span>
        </h1>
        <p className={styles.description}>
          Personalized and unique gifts for every occasion
        </p>
      </div>
    </section>
  );
}
