import api from "@/lib/api"
import type { PostProductRequestBody } from "@/types/product"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const addProduct = useMutation({
    mutationFn: (newProduct: PostProductRequestBody) => {
      return api.post('/product', newProduct)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const deleteProduct = useMutation({
    mutationFn: (productId: string) => {
      return api.delete(`/product/${productId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const uploadProductImage = useMutation({
    mutationFn: (body:{productId:string,image:File}) => {
      return api.post(
        `/upload/product-image`,
        body,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  return {
    addProduct,
    deleteProduct,
    uploadProductImage
  }
}