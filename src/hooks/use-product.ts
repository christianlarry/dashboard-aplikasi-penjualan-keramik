import api from "@/lib/api"
import type { GetProductResponse, PostProductRequestBody } from "@/types/product"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useProduct = ()=>{
  // Get all products
  const getProducts = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get<GetProductResponse>('/products')
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

  return {
    getProducts,
    addProduct
  }
}

export default useProduct