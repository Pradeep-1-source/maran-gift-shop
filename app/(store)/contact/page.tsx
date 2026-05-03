import styles from './Contact.module.css';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="page-container">
      <section className={styles.hero}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out today!</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.info}>
              <div className={styles.card}>
                <Phone size={24} color="var(--brand-gold)" />
                <div>
                  <h3>Call / WhatsApp</h3>
                  <p>+91 79043 73403</p>
                </div>
              </div>
              <div className={styles.card}>
                <Mail size={24} color="var(--brand-gold)" />
                <div>
                  <h3>Email</h3>
                  <p>hello@marangifts.com</p>
                </div>
              </div>
              <div className={styles.card}>
                <MapPin size={24} color="var(--brand-gold)" />
                <div>
                  <h3>Visit Us</h3>
                  <p>Karthik Maran.R, AK Medias,<br />61, Hospital Street, Hyper Mall Opposite,<br />Thiruthuraipoondi-614713.</p>
                </div>
              </div>
              <div className={styles.card}>
                <Clock size={24} color="var(--brand-gold)" />
                <div>
                  <h3>Shop Hours</h3>
                  <p>Mon - Sat: 10:00 AM - 9:00 PM</p>
                  <p>Sun: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <form className={styles.form}>
                <h2>Send a Message</h2>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Name</label>
                    <input type="text" placeholder="Your Name" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input type="email" placeholder="Your Email" />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Subject</label>
                  <input type="text" placeholder="How can we help?" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Message</label>
                  <textarea rows={5} placeholder="Your Message..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>

          <div className={styles.map}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15676.84360677112!2d78.6881!3d10.8214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5b974555555%3A0xe5464!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0, borderRadius: '20px' }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
