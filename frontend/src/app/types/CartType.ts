export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  cartId?: number;
  productId?: number;
  quantity?: number;
  cartItemCount?: number;
}
