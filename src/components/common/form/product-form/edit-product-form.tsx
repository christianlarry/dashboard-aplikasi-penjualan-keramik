import type { PostProduct } from "@/validations/productsSchema"
import ProductForm from "./product-form"
import type { Product } from "@/types/product"
import { forwardRef } from "react"
import { useProductMutation } from "@/hooks/use-product-mutation"
import { toast } from "sonner"
import { AxiosError } from "axios"

interface Props {
  currentProduct: Product
}

const EditProductForm = forwardRef<HTMLFormElement,Props>(({
  currentProduct,
},ref) => {

  const defaultValues: PostProduct = {
    name: currentProduct.name,
    description: currentProduct.description,
    application: currentProduct.specification.application,
    design: currentProduct.specification.design,
    sizeWidth: currentProduct.specification.size.width,
    sizeHeight: currentProduct.specification.size.height,
    color: currentProduct.specification.color,
    finishing: currentProduct.specification.finishing,
    texture: currentProduct.specification.texture,
    brand: currentProduct.brand,
    price: currentProduct.price,
    tilesPerBox: currentProduct.tilesPerBox,
    discount: currentProduct.discount,
    isSlipResistant: currentProduct.specification.isSlipResistant,
    isWaterResistant: currentProduct.specification.isWaterResistant,
    isBestSeller: currentProduct.isBestSeller,
    isNewArrivals: currentProduct.isNewArrivals,
    recommended: currentProduct.recommended,
  }

  const {updateProduct} = useProductMutation()

  const onSubmit = async (data:PostProduct)=>{
    try {
      
      const result = await updateProduct.mutateAsync({
        productId: currentProduct._id ?? "",
        newProduct: data
      })

      if(result.status === 200){
        toast.success("Produk berhasil diperbarui!")
        // Optionally, you can call a callback or update state here
      }

    } catch (err) {
      if(err instanceof AxiosError && err.response){
        const errResponse = err.response
        if(errResponse.status === 400){
          if(errResponse.data.error.message === "Validation Error"){
            const errFields = errResponse.data.error.errors as Array<{ field: string; message: string }>
            const errorMap: Record<string, string[]> = {}

            errFields.forEach(errField => {
              if(!errorMap[errField.field]){
                errorMap[errField.field] = []
              }
              errorMap[errField.field].push(errField.message)
            })

            Object.keys(errorMap).forEach((field) => {
              toast.error(`Field "${field}" has error: ${errorMap[field].join(", ")}`)
            })
          }
        }
      }else{
        toast.error("An unexpected error occurred. Please try again later.")
      }
    }
  }

  return (
    <ProductForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      ref={ref}
    />
  )
})

export default EditProductForm