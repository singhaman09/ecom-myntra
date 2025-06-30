import React, { memo, useMemo } from 'react';
import ProductSection from '../ProductSection/ProductSection';
import type { Product } from '../../../product/interfaces/ProductInterfaces';

interface TrendingProductsProps {
  products?: Product[];
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products = [] }) => {
  const sampleProducts = useMemo(() => [
      {
        _id: "recommended_2",
        images: [
          { url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop", isPrimary: true }
        ],
        brand: "The Body Shop",
        name: "Fuji Green Tea Shower Gel",
        price: 249,
        category: "Bath & Body",
        subCategory: "Shower Gel",
        totalStock: 40,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        description: "Refreshing shower gel with green tea extracts",
        reviews: [
          { rating: 5, comment: "Refreshing and energizing" },
          { rating: 4, comment: "Great fragrance" },
          { rating: 5, comment: "Love this product" }
        ]
      },
      {
        _id: "recommended_1",
        images: [
          { url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=300&fit=crop", isPrimary: true }
        ],
        brand: "The Body Shop",
        name: "Anti Dandruff Shampoo",
        price: 299,
        category: "Hair Care",
        subCategory: "Shampoo",
        totalStock: 35,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        description: "Anti-dandruff shampoo with ginger extracts",
        reviews: [
          { rating: 4, comment: "Effective against dandruff" },
          { rating: 5, comment: "Great results" },
          { rating: 4, comment: "Good value for money" }
        ]
      },
      {
        _id: "recommended_3",
        images: [
          { url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop", isPrimary: true }
        ],
        brand: "The Body Shop",
        name: "Tea Tree Face Wash",
        price: 199,
        category: "Face Care",
        subCategory: "Face Wash",
        totalStock: 50,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        description: "Purifying face wash with tea tree oil",
        reviews: [
          { rating: 4, comment: "Good for oily skin" },
          { rating: 3, comment: "Decent product" },
          { rating: 4, comment: "Helps with acne" }
        ]
      },
      {
        _id: "recommended_4",
        images: [
          { url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=300&fit=crop", isPrimary: true }
        ],
        brand: "The Body Shop",
        name: "Vitamin E Moisturizer",
        price: 349,
        category: "Face Care",
        subCategory: "Moisturizer",
        totalStock: 25,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        description: "Daily moisturizer with Vitamin E for all skin types",
        reviews: [
          { rating: 5, comment: "Perfect for daily use" },
          { rating: 4, comment: "Good moisturizer" },
          { rating: 5, comment: "Great for sensitive skin" },
          { rating: 4, comment: "Lightweight formula" }
        ]
      }
    ], []);

  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <ProductSection 
      title="Trending" 
      products={displayProducts} 
      backgroundColor="white"
    />
  );
};

export default memo(TrendingProducts);
