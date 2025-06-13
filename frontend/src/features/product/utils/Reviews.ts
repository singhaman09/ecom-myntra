import type { Review } from "../interfaces/ProductInterfaces";

 export const averageRating=(reviews:Review[]) =>( reviews.length > 0
? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
: 0);

export function formatNumber(num:number) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + 'B';
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  }
 export function formatDate(date: string | Date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }