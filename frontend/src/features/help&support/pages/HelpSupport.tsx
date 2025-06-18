import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Order } from '../../order/types/orders';
import type { SupportQuery } from '../types/support';
import HelpSupportHeader from '../components/HelpSupportHeader';
import RecentPurchaseSection from '../components/RecentPurchaseSection';
import QueriesSection from '../components/QueriesSection';
import ContactUsModal from '../components/ContactUsModal';
import WriteToUsForm from '../components/WriteToUsForm';
import styles from '../css/Helpsupport.module.css';

interface HelpSupportPageProps {
  order?: Order;
  onBack?: () => void;
}

const HelpSupportPage: React.FC<HelpSupportPageProps> = ({ order: propOrder, onBack: propOnBack }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve order from route state if not passed as prop
  const state = location.state as { order?: Order };
  const order = propOrder || state?.order;

  // Fallback onBack
  const onBack = propOnBack || (() => navigate(-1));

  const [showContactModal, setShowContactModal] = useState(false);
  const [showWriteToUs, setShowWriteToUs] = useState(false);

  if (!order) {
    return <div>No order data available.</div>;
  }

  const queries: SupportQuery[] = [
    {
      id: '1',
      title: 'Want to return order',
      isExpanded: false,
      description: 'Dreaming of a summer escape?...'
    },
    {
      id: '2',
      title: 'Issue with the order',
      isExpanded: false,
      description: 'Lorem ipsum dolor sit amet...'
    },
    // ... other queries
  ];

  const handleContactUs = () => setShowContactModal(true);

  const handleWriteToUs = () => {
    setShowContactModal(false);
    setShowWriteToUs(true);
  };

  const handleWriteToUsSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    setShowWriteToUs(false);
  };

  const handleWriteToUsBack = () => {
    setShowWriteToUs(false);
  };

  if (showWriteToUs) {
    return (
      <WriteToUsForm
        orderNumber={order.id}
        onBack={handleWriteToUsBack}
        onSubmit={handleWriteToUsSubmit}
      />
    );
  }

  return (
    <div className={styles.helpSupportPage}>
      <HelpSupportHeader onBack={onBack} />
      <div className={styles.content}>
        <RecentPurchaseSection order={order} />
        <QueriesSection queries={queries} onContactUs={handleContactUs} />
      </div>
      <ContactUsModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onWriteToUs={handleWriteToUs}
      />
    </div>
  );
};

export default HelpSupportPage;
