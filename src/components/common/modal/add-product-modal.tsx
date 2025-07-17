import { Dialog, DialogContent, DialogHeader, DialogPortal } from "@/components/ui/dialog"
import AddProductForm from "../form/add-product-form"

interface Props {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const AddProductModal = ({
  open = false,
  onOpenChange
}: Props) => {  
  if (!open) return null

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">Tambah Produk Keramik</h2>
          </DialogHeader>
          <AddProductForm/>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default AddProductModal