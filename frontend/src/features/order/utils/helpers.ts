export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  };
  return date.toLocaleDateString('en-US', options);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'delivered': return '#4CAF50';
    case 'shipped': return '#2196F3';
    case 'pending': return '#FF9800';
    case 'cancelled': return '#F44336';
    default: return '#757575';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'delivered': return 'Delivered';
    case 'shipped': return 'Shipped';
    case 'pending': return 'Pending';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};