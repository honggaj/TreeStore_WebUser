/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { CreateCategoryRequest } from '../models/create-category-request';
export interface ProductResponse {
  bannerImg?: string | null;
  categoryId?: number;
  categoryList?: Array<CreateCategoryRequest> | null;
  description?: string | null;
  img?: string | null;
  img2?: string | null;
  img3?: string | null;
  introduceBannerHtml?: string | null;
  isActive?: boolean | null;
  isBanner?: boolean;
  isFeather?: boolean;
  isPopular?: boolean;
  isSell?: boolean | null;
  isSpecialOffer?: boolean;
  name?: string | null;
  priceInput?: number;
  priceOutput?: number;
  productId?: number;
  quantity?: number;
  saleOff?: number;
  shortDescription?: string | null;
  slug?: string | null;
}