import styles from './ContactSection.module.css';
import { MapPin, Phone, User, Home } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.info}>
            <span className={styles.label}>Get in Touch</span>
            <h2 className={styles.title}>Contact Details</h2>
            <p className={styles.subtitle}>Visit our store or reach out for inquiries.</p>
            
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><Home size={24} /></div>
                <div>
                  <h4>Store Name</h4>
                  <p>Maran Gifts (AK Medias)</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><User size={24} /></div>
                <div>
                  <h4>Contact Person</h4>
                  <p>Karthik Maran.R</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><Phone size={24} /></div>
                <div>
                  <h4>Phone Number</h4>
                  <p>+91 7904373403</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><MapPin size={24} /></div>
                <div>
                  <h4>Address</h4>
                  <p>61, Hospital Street, Hyper Mall Opposite,<br />Thiruthuraipoondi - 614713</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.4688402543944!2d79.641666!3d10.533333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5f3df3e4e64903%3A0x6335a165b45b0a3b!2sThiruthuraipoondi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714555000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '20px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
