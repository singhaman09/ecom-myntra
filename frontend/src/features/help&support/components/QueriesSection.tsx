import React, { useState } from 'react';
import type { SupportQuery } from '../types/support';
import styles from '../css/Helpsupport.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface QueriesSectionProps {
  queries: SupportQuery[];
  onContactUs: () => void;
}

const QueriesSection: React.FC<QueriesSectionProps> = ({ queries: initialQueries, onContactUs }) => {
  const [queries, setQueries] = useState<SupportQuery[]>(initialQueries);
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);

  const toggleQuery = (queryId: string) => {
    setExpandedQuery(expandedQuery === queryId ? null : queryId);
  };

  const handleFeedback = (isHelpful: boolean) => {
   toast.success(isHelpful ? 'Glad it helped!' : 'Thanks for the feedback!',{ toastId: 'success-id-1' });
  };

  return (
    <div className={styles.queriesSection}>
      <h3 className={styles.sectionTitle}>Queries related to your order ?</h3>
      
      {queries.map((query) => (
        <div key={query.id} className={styles.queryItem}>
          <div className={styles.queryHeader} onClick={() => toggleQuery(query.id)}>
            <span className={styles.queryTitle}>{query.title}</span>
            <span className={styles.queryToggle}>
              {expandedQuery === query.id ? '−' : '+'}
            </span>
          </div>
          
          {expandedQuery === query.id && query.description && (
            <div className={styles.queryContent}>
              <p className={styles.queryDescription}>{query.description}</p>
              
              <div className={styles.feedbackSection}>
                <span className={styles.feedbackText}>Was this helpful ?</span>
                <div className={styles.feedbackButtons}>
                  <button 
                    className={styles.feedbackBtn}
                    onClick={() => handleFeedback(false)}
                  >
                    No
                  </button>
                  <button 
                    className={styles.feedbackBtn}
                    onClick={() => handleFeedback(true)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <button className={styles.contactUsBtn} onClick={onContactUs}>
        Contact us
      </button>
    </div>
  );
};

export default QueriesSection;