export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  art: string;
  photoUrl?: string;
  color: string;
  colorHex: string;
  pricePerPackage: number;
  packageSize: number;
  quantityPackages: number;
}

export interface CartState {
  version: 1;
  sessionId: string;
  items: CartItem[];
}

export type CartAction =
  | { type: "HYDRATE"; payload: CartState }
  | { type: "ADD_ITEM"; payload: { item: Omit<CartItem, "quantityPackages">; quantityPackages: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantityPackages: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "CLEAR_CART" };
