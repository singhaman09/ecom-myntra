import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
export const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} fontSize="small" style={{ color: '#16a34a' }} />
      );
    }
    if (hasHalfStar) {
      // Use a half-filled star if you want, or just show a full star for simplicity
      stars.push(
        <StarIcon key="half" fontSize="small" style={{ color: '#16a34a', opacity: 0.5 }} />
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarBorderIcon key={`empty-${i}`} fontSize="small" style={{ color: '#d1d5db' }} />
      );
    }
    return stars;
  };