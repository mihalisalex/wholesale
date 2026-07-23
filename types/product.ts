export type StockStatus = "in-stock" | "low-stock" | "made-to-order";

export type ProductCategory = "sneakers" | "boots" | "loafers" | "sandals" | "heels";

export type ProductGender = "men" | "women" | "unisex";

export interface ProductImage {
  /** Icon key rendered by ProductLineArt, used as a placeholder "photo" */
  art: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  collection: string;
  gender: ProductGender;
  description: string;
  color: string;
  colorHex: string;
  material: string;
  sizes: string[];
  packageSize: 8;
  pricePerPackage: number;
  images: ProductImage[];
  tags: string[];
  stockStatus: StockStatus;
  isNewArrival: boolean;
  createdAt: string;
  packagingInfo: string;
  metaTitle?: string;
  metaDescription?: string;
}
