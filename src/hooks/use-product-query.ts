import api from "@/lib/api"
import { buildUrlWithParams } from "@/lib/utils"
import type { GetProductResponse } from "@/types/product"
import { useQuery } from "@tanstack/react-query"

interface GetProductsQueryParams {
  page: number
  size: number
  search?: string
  isBestSeller?: boolean
  isNewArrival?: boolean
  isDiscounted?: boolean
}

export const useProductQuery = ({
  page,
  size,
  search,
  isBestSeller=false,
  isDiscounted=false,
  isNewArrival=false
}:GetProductsQueryParams) => {
  return useQuery({
    queryKey: [
      'products',
      page, 
      size, 
      search || "",
      isBestSeller,
      isNewArrival,
      isDiscounted
    ], // queryKey harus unik untuk setiap kombinasi page & size
    queryFn: async () => {
      const { data } = await api.get<GetProductResponse>(buildUrlWithParams(
        '/product',
        {
          pagination_page: page,
          pagination_size: size,
          search: search,
          bestSeller: isBestSeller,
          newArrivals: isNewArrival,
          discounted: isDiscounted
        }
      ))
      return data
    }
  })
}