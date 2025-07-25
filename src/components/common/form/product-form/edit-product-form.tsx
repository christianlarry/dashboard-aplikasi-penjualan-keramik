import type { PostProduct } from "@/validations/productsSchema"
import ProductForm from "./product-form"
import type { Product } from "@/types/product"
import { forwardRef } from "react"

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
    discount: currentProduct.discount,
    isSlipResistant: currentProduct.specification.isSlipResistant,
    isWaterResistant: currentProduct.specification.isWaterResistant,
    isBestSeller: currentProduct.isBestSeller,
    isNewArrivals: currentProduct.isNewArrivals,
    recommended: currentProduct.recommended,
  }

  const onSubmit = (data:PostProduct)=>{
    console.log(data)
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