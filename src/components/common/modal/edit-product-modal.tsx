import { Dialog, DialogContent, DialogHeader, DialogPortal } from "@/components/ui/dialog"
import type { CustomModalProps } from "@/types/modal"
import type { Product } from "@/types/product"

interface Props extends CustomModalProps {
  product:Product
}

const EditProductModal = ({
  onOpenChange,
  open = false,
  product 
}:Props) => {
  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">Edit Produk Keramik</h2>
          </DialogHeader>

          <div>
            Ini form edit data produk keramik {product.name}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default EditProductModal