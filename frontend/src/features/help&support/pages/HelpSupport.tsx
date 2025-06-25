import React, { useEffect, useState } from 'react';
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

  const order = location.state?.order as Order;

  // Fallback onBack
  const onBack = propOnBack || (() => navigate(-1));

  const [showContactModal, setShowContactModal] = useState(false);
  const [showWriteToUs, setShowWriteToUs] = useState(false);

  if (!order) {
    return <div>No order data available.</div>;
  }
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  const queries: SupportQuery[] = [
  {
    id: '1',
    title: 'Want to return order',
    isExpanded: false,
    description: 'Dreaming of a summer escape? Return your items easily within the return window.'
  },
  {
    id: '2',
    title: 'Issue with the order',
    isExpanded: false,
    description: 'Received a wrong or damaged item? Let us help you resolve it quickly.'
  },
  {
    id: '3',
    title: 'Need invoice for my order',
    isExpanded: false,
    description: 'You can download your invoice from the order details page. Still need help? Reach out to us.'
  },
  {
    id: '4',
    title: 'Payment failed but money deducted',
    isExpanded: false,
    description: 'If your money was deducted and order wasn’t placed, the amount will be refunded within 5–7 days.'
  },
  {
    id: '5',
    title: 'Order is delayed',
    isExpanded: false,
    description: 'Sometimes orders can be delayed due to unforeseen circumstances. Track your order for the latest update.'
  },
  {
    id: '6',
    title: 'Cancel my order',
    isExpanded: false,
    description: 'If your order hasn’t been shipped, you can cancel it from the order details page.'
  },
  {
    id: '7',
    title: 'Want to change delivery address',
    isExpanded: false,
    description: 'Changing address after placing an order isn’t always possible. Contact us if your order hasn’t shipped.'
  },
  {
    id: '8',
    title: 'Item missing from package',
    isExpanded: false,
    description: 'Sorry for the inconvenience. Please raise a complaint within 48 hours of delivery.'
  }
];


  const handleContactUs = () => setShowContactModal(true);

  const handleWriteToUs = () => {
    setShowContactModal(false);
    setShowWriteToUs(true);
  };

  const handleWriteToUsSubmit = (formData: any) => {
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
