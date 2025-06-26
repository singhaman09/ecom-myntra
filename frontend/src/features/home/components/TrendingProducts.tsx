import React, { memo } from 'react';
import ProductSection from './ProductSection';
import type { Product } from '../../product/interfaces/ProductInterfaces';

interface TrendingProductsProps {
  products?: Product[];
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products = [] }) => {
  const sampleProducts: Product[] = [
    {
      _id: "trending_1",
      images: [
        { url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=300&fit=crop", isPrimary: true }
      ],
      brand: "The Body Shop",
      name: "Fuji Green Tea Shower Gel",
      price: 599,
      category: "Bath & Body",
      subCategory: "Shower Gel",
      totalStock: 50,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Refreshing green tea shower gel with natural ingredients",
      reviews: [
        { rating: 5, comment: "Amazing product!" },
        { rating: 4, comment: "Good quality" },
        { rating: 5, comment: "Love the fragrance" }
      ]
    },
    {
      _id: "trending_2",
      images: [
        { url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop", isPrimary: true }
      ],
      brand: "The Body Shop",
      name: "Satsuma Shower Gel",
      price: 549,
      category: "Bath & Body",
      subCategory: "Shower Gel",
      totalStock: 35,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Energizing satsuma shower gel with citrus extracts",
      reviews: [
        { rating: 4, comment: "Great smell" },
        { rating: 5, comment: "Excellent product" },
        { rating: 4, comment: "Good value" }
      ]
    },
    {
      _id: "trending_3",
      images: [
        { url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop", isPrimary: true }
      ],
      brand: "The Body Shop",
      name: "Hemp Hand Protector",
      price: 299,
      category: "Hand Care",
      subCategory: "Hand Cream",
      totalStock: 20,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Protective hand cream with hemp seed oil",
      reviews: [
        { rating: 4, comment: "Very moisturizing" },
        { rating: 5, comment: "Perfect for dry hands" }
      ]
    },
    {
      _id: "trending_4",
      images: [
        { url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=300&fit=crop", isPrimary: true }
      ],
      brand: "The Body Shop",
      name: "British Rose Body Lotion",
      price: 799,
      category: "Body Care",
      subCategory: "Body Lotion",
      totalStock: 40,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Luxurious body lotion with British rose extracts",
      reviews: [
        { rating: 5, comment: "Amazing fragrance" },
        { rating: 4, comment: "Great quality" },
        { rating: 5, comment: "Love this product" }
      ]
    }
  ];

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
