import { type PostProduct } from "@/validations/productsSchema"

import { forwardRef } from "react"
import type { Product } from "@/types/product"
import { useProductMutation } from "@/hooks/use-product-mutation"
import { toast } from "sonner"
import ProductForm from "./product-form"

interface Props{
  onSuccess?: (newProduct:Product) => void
}

const AddProductForm = forwardRef<HTMLFormElement,Props>(({onSuccess},ref) => {

  const defaultValues:PostProduct = {
    name: "",
    description: "",
    application: [],
    design: "",
    sizeWidth: 0,
    sizeHeight: 0,
    color: [],
    finishing: "",
    texture: "",
    brand: "",
    price: 0,
    discount: undefined,
    isSlipResistant: false,
    isWaterResistant: false,
    isBestSeller: false,
    isNewArrivals: false,
    recommended: [],
  }

  const {addProduct} = useProductMutation()

  const onSubmit = async (data: PostProduct) => {
    try {
      const result = await addProduct.mutateAsync(data)

      if(result.status === 201){
        const insertedProduct = result.data.data as Product

        toast.success("Produk berhasil ditambahkan!")
        onSuccess?.(insertedProduct)
      }

    } catch (err) {
      console.error(err)
      // Handle Post Error Here
    }
  }

  return (
    <ProductForm
      ref={ref}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  )
})

export default AddProductForm