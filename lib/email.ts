import { Resend } from 'resend';
import {
  EmailTemplate,
  OrderConfirmationEmailData,
  WelcomeEmailData,
  PasswordResetEmailData,
  OrderStatusUpdateData,
  EmailResponse,
} from '@/lib/types/email';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(template: EmailTemplate): Promise<EmailResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: template.from,
      to: template.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function sendOrderConfirmation(
  data: OrderConfirmationEmailData
): Promise<EmailResponse> {
  const template: EmailTemplate = {
    from: 'orders@yourdomain.com',
    to: data.customerName,
    subject: `Order Confirmation #${data.orderNumber}`,
    html: `
      <h1>Order Confirmation</h1>
      <p>Dear ${data.customerName},</p>
      <p>Thank you for your order #${data.orderNumber}.</p>
      <h2>Order Details</h2>
      <p>Order Date: ${data.orderDate}</p>
      <p>Total: $${data.orderTotal.toFixed(2)}</p>
      <h3>Items</h3>
      <ul>
        ${data.items
          .map(
            (item) => `
          <li>${item.name} x${item.quantity} - $${item.price.toFixed(2)}</li>
        `
          )
          .join('')}
      </ul>
      <h3>Shipping Address</h3>
      <p>
        ${data.shippingAddress.street}<br>
        ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.postalCode}<br>
        ${data.shippingAddress.country}
      </p>
    `,
  };

  return sendEmail(template);
}

export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResponse> {
  const template: EmailTemplate = {
    from: 'welcome@yourdomain.com',
    to: data.customerName,
    subject: 'Welcome to Our Store!',
    html: `
      <h1>Welcome to Our Store!</h1>
      <p>Dear ${data.customerName},</p>
      <p>Thank you for creating an account with us.</p>
      ${
        data.verificationLink
          ? `
        <p>Please verify your email by clicking the link below:</p>
        <a href="${data.verificationLink}">Verify Email</a>
      `
          : ''
      }
    `,
  };

  return sendEmail(template);
}

export async function sendPasswordReset(data: PasswordResetEmailData): Promise<EmailResponse> {
  const template: EmailTemplate = {
    from: 'security@yourdomain.com',
    to: data.customerName,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>Dear ${data.customerName},</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <a href="${data.resetLink}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  return sendEmail(template);
}

export async function sendOrderStatusUpdate(data: OrderStatusUpdateData): Promise<EmailResponse> {
  const template: EmailTemplate = {
    from: 'orders@yourdomain.com',
    to: data.customerName,
    subject: `Order #${data.orderNumber} Status Update`,
    html: `
      <h1>Order Status Update</h1>
      <p>Dear ${data.customerName},</p>
      <p>Your order #${data.orderNumber} has been ${data.newStatus}.</p>
      ${
        data.trackingNumber
          ? `
        <p>Tracking Number: ${data.trackingNumber}</p>
      `
          : ''
      }
      ${
        data.estimatedDeliveryDate
          ? `
        <p>Estimated Delivery Date: ${data.estimatedDeliveryDate}</p>
      `
          : ''
      }
    `,
  };

  return sendEmail(template);
}
