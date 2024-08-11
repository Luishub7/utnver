export const formatDate = (date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const timeDifference = now - messageDate;
    const oneDay = 24 * 60 * 60 * 1000;
    const twoDays = 48 * 60 * 60 * 1000;
  
    if (timeDifference < oneDay) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeDifference < twoDays) {
      return 'Ayer';
    } else {
      return messageDate.toLocaleDateString();
    }
  };
  