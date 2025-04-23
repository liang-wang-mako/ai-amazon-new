export interface EmailTemplate {
  subject: string;
  from: string;
  to: string;
  html?: string;
  text?: string;
}

export interface OrderConfirmationEmailData {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  orderTotal: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface WelcomeEmailData {
  customerName: string;
  verificationLink?: string;
}

export interface PasswordResetEmailData {
  customerName: string;
  resetLink: string;
}

export interface OrderStatusUpdateData {
  orderNumber: string;
  customerName: string;
  newStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
} 