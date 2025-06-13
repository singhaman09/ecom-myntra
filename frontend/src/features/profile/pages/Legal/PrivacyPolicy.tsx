import React from 'react';
import { Calendar, Lock, Eye, Shield } from 'lucide-react';
import styles from './Legal.module.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Lock size={48} />
        </div>
        <h1 className={styles.title}>Privacy Policy</h1>
        <div className={styles.lastUpdated}>
          <Calendar size={16} />
          <span>Last updated: January 15, 2024</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.importantNotice}>
          <Eye size={20} />
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
        </div>

        <section className={styles.section}>
          <h2>1. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you provide directly to us, including:</p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (processed securely by third-party providers)</li>
            <li>Account credentials and preferences</li>
            <li>Communication preferences and marketing consents</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you use our Service, we may automatically collect:</p>
          <ul>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, time spent, click patterns)</li>
            <li>Location information (if you enable location services)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer service and support</li>
            <li>Send you important updates about your orders and account</li>
            <li>Personalize your shopping experience</li>
            <li>Improve our products and services</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Detect and prevent fraud and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Information Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>
          
          <h3>Service Providers</h3>
          <p>We share information with third-party service providers who help us operate our business:</p>
          <ul>
            <li>Payment processors for secure transaction processing</li>
            <li>Shipping companies for order delivery</li>
            <li>Email service providers for communications</li>
            <li>Analytics providers to understand user behavior</li>
            <li>Customer service platforms</li>
          </ul>

          <h3>Legal Requirements</h3>
          <p>We may disclose your information if required by law or in response to:</p>
          <ul>
            <li>Court orders or legal processes</li>
            <li>Government requests or investigations</li>
            <li>Protection of our rights and property</li>
            <li>Prevention of fraud or illegal activities</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information:</p>
          <ul>
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Secure servers and data centers</li>
            <li>Regular security audits and assessments</li>
            <li>Access controls and employee training</li>
            <li>Incident response procedures</li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure. 
            While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Keep you logged in to your account</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Provide personalized content and advertisements</li>
            <li>Improve website functionality and performance</li>
          </ul>
          <p>
            You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of our Service.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Your Privacy Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Objection:</strong> Object to certain processing of your information</li>
            <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided below.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Marketing Communications</h2>
          <p>
            We may send you marketing communications about our products, services, and promotions. You can:
          </p>
          <ul>
            <li>Opt-out of marketing emails by clicking the unsubscribe link</li>
            <li>Update your communication preferences in your account settings</li>
            <li>Contact us directly to modify your preferences</li>
          </ul>
          <p>
            Note that you cannot opt-out of transactional communications related to your orders and account.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to:
          </p>
          <ul>
            <li>Provide our services to you</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce agreements</li>
            <li>Maintain business records</li>
          </ul>
          <p>
            When we no longer need your information, we will securely delete or anonymize it.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure appropriate safeguards are in place to protect your information during such transfers, 
            including standard contractual clauses and adequacy decisions.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly collect 
            personal information from children under 13. If we become aware that we have collected 
            personal information from a child under 13, we will take steps to delete such information.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by posting the new Privacy Policy on this page and updating the "Last updated" date. 
            We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>Email:</strong> privacy@company.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Business Street, Suite 100, City, State 12345</p>
            <p><strong>Data Protection Officer:</strong> dpo@company.com</p>
          </div>
        </section>

        <div className={styles.footer}>
          <div className={styles.footerIcon}>
            <Shield size={24} />
          </div>
          <p>
            We are committed to protecting your privacy and maintaining the security of your personal information. 
            This policy reflects our dedication to transparency and your right to privacy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;