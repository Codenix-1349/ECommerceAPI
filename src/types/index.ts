export interface OrderProductInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderBody {
  userId: string;
  products: OrderProductInput[];
}

export interface UpdateOrderBody {
  userId?: string;
  products?: OrderProductInput[];
}
