import api from "@/lib/api"
import type { PostProductRequestBody, PutProductRequestBody } from "@/types/product"
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

  const updateProduct = useMutation({
    mutationFn: (variables: {productId:string, newProduct: PutProductRequestBody}) => {
      return api.put(`/product/${variables.productId}`, variables.newProduct)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const updateProductFlags = useMutation({
    mutationFn: (variables: { productId: string; body:{isBestSeller?: boolean; isNewArrivals?: boolean;}}) => {
      return api.patch(`/product/${variables.productId}/flags`, variables.body) 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const updateProductDiscount = useMutation({
    mutationFn: (variables: { productId: string; body:{ discount: number; }; }) => {
      return api.patch(`/product/${variables.productId}/discount`, variables.body)
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
    updateProduct,
    updateProductFlags,
    updateProductDiscount,
    deleteProduct,
    uploadProductImage
  }
}