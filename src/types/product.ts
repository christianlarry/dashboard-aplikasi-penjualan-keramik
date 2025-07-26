import type { Pagination } from "./globalTypes";

export interface Product {
  _id?: string,
  name: string,
  description?: string,
  specification:{
    size: {
      width: number,
      height: number
    },
    application: string[],
    design: string,
    color: string[],
    finishing: string,
    texture: string,
    isWaterResistant:boolean,
    isSlipResistant:boolean,
  }
  brand: string,
  price: number,
  finalPrice: number,
  discount?:number,
  isBestSeller?:boolean,
  isNewArrivals?:boolean,
  image?: string,
  recommended?: string[],
  createdAt: Date,
  updatedAt: Date
}

export interface GetProductResponse {
  data:Product[],
  page:Pagination
}

export interface PostProductRequestBody{
  name: string;
  description?: string;
  application: string[];
  design: string;
  sizeWidth: number;
  sizeHeight: number;
  color: string[];
  finishing: string;
  texture: string;
  brand: string;
  price: number;
  discount?: number;
  isSlipResistant: boolean;
  isWaterResistant: boolean;
  isBestSeller?: boolean;
  isNewArrivals?: boolean;
  recommended?: string[];
}

export type PutProductRequestBody = PostProductRequestBody