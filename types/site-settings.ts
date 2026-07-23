export interface ShippingMethod {
  value: string;
  label: string;
}

export interface SiteSettings {
  company: {
    name: string;
    legalName: string;
    logoPath: string;
    email: string;
    phone: string;
    website: string;
    address: {
      line1: string;
      city: string;
      postalCode: string;
      country: string;
    };
    vatNumber: string;
  };
  banking: {
    bankName: string;
    iban: string;
    swiftBic: string;
    accountHolder: string;
  };
  commerce: {
    currency: string;
    currencySymbol: string;
    taxRatePercent: number;
    packageSize: number;
    minOrderPackagesNote: string;
  };
  shipping: {
    methods: ShippingMethod[];
    estimatedLeadTime: string;
    defaultEstimatedShipping: number;
  };
  terms: {
    paymentTerms: string;
    termsAndConditions: string;
  };
  contact: {
    whatsappNumber: string;
    businessHours: {
      timezone: string;
      weekdayLabel: string;
      weekendLabel: string;
      startHour: number;
      endHour: number;
      /** 0 = Sunday … 6 = Saturday */
      days: number[];
    };
  };
}
