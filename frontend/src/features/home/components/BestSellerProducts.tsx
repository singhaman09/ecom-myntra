import ProductSection from './ProductSection';

const BestSellerProducts = ({ products = [] }) => {
  // Sample data structure matching your Product interface
  const sampleProducts = [
    {
      _id: "bestseller_1",
      imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=300&h=300&fit=crop",
      brand: "The Body Shop",
      name: "Banana Nourishment Hair Mask",
      price: 799,
      category: "Hair Care",
      subCategory: "Hair Mask",
      totalStock: 25,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Nourishing hair mask with real banana extracts",
      reviews: [
        { rating: 5, comment: "Best hair mask ever!" },
        { rating: 5, comment: "My hair feels so soft" },
        { rating: 4, comment: "Great results" },
        { rating: 5, comment: "Amazing product" }
      ]
    },
    {
      _id: "bestseller_2",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
      brand: "The Body Shop",
      name: "Fuji Green Tea Eau De Toilette",
      price: 1299,
      category: "Fragrance",
      subCategory: "Eau De Toilette",
      totalStock: 15,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Fresh and energizing fragrance with green tea notes",
      reviews: [
        { rating: 4, comment: "Long lasting fragrance" },
        { rating: 5, comment: "Love the scent" },
        { rating: 4, comment: "Perfect for daily wear" }
      ]
    },
    {
      _id: "bestseller_3",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
      brand: "The Body Shop",
      name: "Vitamin E Face Cream",
      price: 549,
      category: "Face Care",
      subCategory: "Face Cream",
      totalStock: 30,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Moisturizing face cream enriched with Vitamin E",
      reviews: [
        { rating: 5, comment: "Perfect for my skin type" },
        { rating: 4, comment: "Very moisturizing" },
        { rating: 5, comment: "Great daily moisturizer" }
      ]
    },
    {
      _id: "bestseller_4",
      imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=300&fit=crop",
      brand: "The Body Shop",
      name: "Coconut Body Butter",
      price: 649,
      category: "Body Care",
      subCategory: "Body Butter",
      totalStock: 45,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      description: "Rich and creamy body butter with coconut extracts",
      reviews: [
        { rating: 4, comment: "Very rich and moisturizing" },
        { rating: 5, comment: "Smells amazing" },
        { rating: 4, comment: "Great for dry skin" }
      ]
    }
  ];

  // Use passed products or fall back to sample data
  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <ProductSection 
      title="Best Seller" 
      products={displayProducts} 
      backgroundColor="gray"
    />
  );
};

export default BestSellerProducts;