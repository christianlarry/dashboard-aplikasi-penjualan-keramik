import api from "@/lib/api"
import { buildUrlWithParams } from "@/lib/utils"
import type { GetProductResponse, PostProductRequestBody } from "@/types/product"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface GetProductsQueryParams{
  page:number
  size:number
  search?:string
}

const useProduct = ({page,size,search}:GetProductsQueryParams)=>{
  // Get all products
  const getProducts = useQuery({
      queryKey: ['products', page, size, search||""], // queryKey harus unik untuk setiap kombinasi page & size
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

  // Add new product
  const queryClient = useQueryClient()
  
  const addProduct = useMutation({
    mutationFn: (newProduct: PostProductRequestBody) => {
      return api.post('/products', newProduct)
    },
    onSuccess: () => {
      // Invalidate and refetch products after mutation
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: (productId: string) => {
      return api.delete(`/products/${productId}`)
    },
    onSuccess: () => {
      // Invalidate and refetch products after deletion
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  return {
    getProducts,
    addProduct,
    deleteProduct
  }
}

export default useProduct