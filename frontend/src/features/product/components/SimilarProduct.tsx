import React from 'react'
import ProductList from './ProductList'
import styles from '../styles/SimilarProduct.module.css'
function SimilarProduct() {
  return (
    <div className={styles.container}>
       <h3>SIMILAR PRODUCTS</h3>
        <ProductList isSimilar={true}/>
      <div className={styles.buttonContainer}>
      <button>
          More About
        </button>
      </div>
    </div>
  )
}

export default SimilarProduct