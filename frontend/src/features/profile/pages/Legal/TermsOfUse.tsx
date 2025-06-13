import React from 'react';
import { Calendar, Shield, AlertCircle } from 'lucide-react';
import styles from './Legal.module.css';

const TermsOfUse: React.FC = () => {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Shield size={48} />
        </div>
        <h1 className={styles.title}>Terms of Use</h1>
        <div className={styles.lastUpdated}>
          <Calendar size={16} />
          <span>Last updated: January 15, 2024</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.importantNotice}>
          <AlertCircle size={20} />
          <p>
            Please read these Terms of Use carefully before using our service. 
            By accessing or using our platform, you agree to be bound by these terms.
          </p>
        </div>

        <section className={styles.section}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this e-commerce platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Account Registration</h2>
          <p>
            To access certain features of our Service, you may be required to create an account. You agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Use of Service</h2>
          <p>You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the Service in any way that violates applicable laws or regulations</li>
            <li>Transmit or procure the sending of any advertising or promotional material</li>
            <li>Impersonate or attempt to impersonate the company, employees, or other users</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use of the Service</li>
            <li>Use any robot, spider, or other automatic device to access the Service</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Product Information and Pricing</h2>
          <p>
            We strive to provide accurate product descriptions and pricing information. However:
          </p>
          <ul>
            <li>Product colors may vary due to monitor settings and lighting conditions</li>
            <li>We reserve the right to correct pricing errors at any time</li>
            <li>Product availability is subject to change without notice</li>
            <li>All prices are subject to applicable taxes and shipping charges</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Orders and Payment</h2>
          <p>
            When you place an order through our Service:
          </p>
          <ul>
            <li>Your order constitutes an offer to purchase products</li>
            <li>We reserve the right to accept or decline your order</li>
            <li>Payment must be received before order processing</li>
            <li>We accept major credit cards and other specified payment methods</li>
            <li>You are responsible for providing accurate billing information</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Shipping and Delivery</h2>
          <p>
            Shipping and delivery terms:
          </p>
          <ul>
            <li>Delivery times are estimates and not guaranteed</li>
            <li>Risk of loss transfers to you upon delivery</li>
            <li>You must inspect products upon delivery</li>
            <li>Shipping costs are calculated at checkout</li>
            <li>International shipping may be subject to customs duties</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Returns and Refunds</h2>
          <p>
            Our return policy allows:
          </p>
          <ul>
            <li>Returns within 30 days of delivery for most items</li>
            <li>Items must be in original condition with tags attached</li>
            <li>Certain items may be non-returnable (intimate apparel, personalized items)</li>
            <li>Return shipping costs may apply</li>
            <li>Refunds processed within 5-10 business days after return receipt</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. Intellectual Property Rights</h2>
          <p>
            The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Limitation of Liability</h2>
          <p>
            In no event shall our company, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>Email:</strong> legal@company.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Business Street, Suite 100, City, State 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;