import api from "@/lib/api"
import { buildUrlWithParams } from "@/lib/utils"
import type { GetProductResponse } from "@/types/product"
import { useQuery } from "@tanstack/react-query"

interface GetProductsQueryParams {
  page: number
  size: number
  search?: string
}

export const useProductQuery = ({page,size,search}:GetProductsQueryParams) => {
  return useQuery({
    queryKey: ['products', page, size, search || ""], // queryKey harus unik untuk setiap kombinasi page & size
    queryFn: async () => {
      const { data } = await api.get<GetProductResponse>(buildUrlWithParams(
        '/product',
        {
          pagination_page: page,
          pagination_size: size,
          search: search
        }
      ))
      return data
    }
  })
}