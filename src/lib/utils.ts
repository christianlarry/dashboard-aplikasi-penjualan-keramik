import { clsx, type ClassValue } from "clsx"
import type { Location } from "react-router";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string{
  return value.toLocaleString("id-ID", {
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }) + ",00";
}

const productImgBaseUrl = import.meta.env.VITE_API_PRODUCT_IMG_BASEURL || ""

export const getProductImgUrl = (imagePath:string):string=>{
  return productImgBaseUrl+imagePath
}

export function buildUrlWithParams(baseUrl: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(baseUrl, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }
  // Hanya mengembalikan path + query, tanpa origin
  return url.pathname + url.search
}

export const buildCurrentUrlWithParams = (location:Location, params?: Record<string, string | number | boolean | undefined>) =>{
    const searchParams = new URLSearchParams(location.search)

    if(params){
      Object.entries(params).forEach(([key,value])=>{
        if(value !== undefined && value){
          searchParams.set(key,String(value))
        }else{
          searchParams.delete(key)
        }
      })
    }

    return [location.pathname,searchParams.toString()].join("?")
  }