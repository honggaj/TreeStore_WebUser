/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { CartItem } from '../models/cart-item';
export interface CreateOrderRequest {
  cartItems?: Array<CartItem> | null;
  customerId?: number;
  note?: string | null;
  promotionCode?: string | null;
}