export interface OrderRequestCustomer {
  companyName: string;
  vatNumber?: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  shippingAddress: string;
  notes?: string;
  preferredShipping: string;
}

export interface OrderRequestLineItem {
  sku: string;
  name: string;
  color: string;
  pricePerPackage: number;
  quantityPackages: number;
  packageSize: number;
  pairs: number;
  subtotal: number;
}

export interface OrderRequestTotals {
  totalPackages: number;
  totalPairs: number;
  subtotal: number;
  estimatedShipping: number;
  grandTotal: number;
}

export interface OrderRequestPayload {
  customer: OrderRequestCustomer;
  items: OrderRequestLineItem[];
  totals: OrderRequestTotals;
  currency: string;
  sessionId: string;
  paymentTerms: string;
  /** Must arrive empty — filled-in means a bot. */
  companyWebsite?: string;
  /** epoch ms when the form was rendered, used for a minimum-fill-time check */
  formRenderedAt: number;
}

export interface OrderRequestResponse {
  success: boolean;
  invoiceNumber?: string;
  message: string;
  errors?: Record<string, string>;
}
