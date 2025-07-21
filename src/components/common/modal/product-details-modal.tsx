import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import type { CustomModalProps } from "@/types/modal"
import type { Product } from "@/types/product"
import ProductDetailsTable from "../table/product-details-table"


interface Props extends CustomModalProps{
  product: Product
}

const ProductDetailsModal = ({
  open = false,
  onOpenChange,
  product
}:Props) => {
  if (!open) return null
  
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="lg:max-w-3xl">

          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>Lihat semua informasi produk keramik. Seluruh data produk tertera pada tabel dibawah ini.</DialogDescription>
          </DialogHeader>
          
          <section>
            <ProductDetailsTable product={product}/>
          </section>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ProductDetailsModal