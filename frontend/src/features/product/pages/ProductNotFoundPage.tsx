import styles from '../styles/ProductNotFoundPage.module.css';
import {  useNavigate } from 'react-router';
function ProductNotFoundPage() {
  const navigate=useNavigate()
  return (
    <div className={styles.container}>
    <div className={styles.title}>Product Not Found</div>
    <div className={styles.message}>
      Sorry, the product you’re looking for doesn’t exist or is unavailable.<br />
      Try searching for something else or return to our homepage.
    </div>
    <button className={styles.button} onClick={()=>navigate(-1)}>Go Back</button>
  </div>
  )
}

export default ProductNotFoundPage