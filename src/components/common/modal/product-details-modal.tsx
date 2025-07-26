import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import type { CustomModalProps } from "@/types/modal"
import type { Product } from "@/types/product"
import ProductDetailsTable from "../table/product-details-table"
import { Button } from "@/components/ui/button"
import { getProductImgUrl } from "@/lib/utils"
import { toast } from "sonner"
import DeleteProductConfirmDialog from "../alert-dialog/delete-product-confirm-dialog"
import { useCallback, useState } from "react"
import EditProductModal from "./edit-product-modal"


interface Props extends CustomModalProps{
  product: Product
}

const ProductDetailsModal = ({
  open = false,
  onOpenChange,
  product
}:Props) => {

  const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState<boolean>(false)
  const [isEditProductModalOpen,setIsEditProductModalOpen] = useState<boolean>(false)


  const handleLihatGambar = useCallback(()=>{
    if(product.image){
      window.open(getProductImgUrl(product.image), "_blank")
    }else{
      toast.error(`Gambar produk "${product.name}" tidak tersedia.`)
    }
  },[product])

  const handleEditBtnClick = useCallback(()=>{
    setIsEditProductModalOpen(true)
  },[])

  const handleDeleteBtnClick = useCallback(()=>{
    setIsDeleteDialogOpen(true)
  },[])
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="lg:max-w-3xl" onInteractOutside={e => e.preventDefault()}>

          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>Lihat semua informasi produk keramik. Seluruh data produk tertera pada tabel dibawah ini.</DialogDescription>
          </DialogHeader>
          
          <div>
            <section>
              <Button variant="outline" onClick={handleLihatGambar}>Lihat Gambar</Button>
            </section>

            <section>
              <ProductDetailsTable product={product}/>
            </section>
          </div>

          <DialogFooter>
            <Button variant="destructive" onClick={handleDeleteBtnClick}>Delete</Button>
            <Button onClick={handleEditBtnClick}>Edit</Button>
          </DialogFooter>

          <DeleteProductConfirmDialog
            product={product}
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          />

          <EditProductModal
            product={product}
            open={isEditProductModalOpen} // This modal is not used here, but you can pass the state if needed
            onOpenChange={setIsEditProductModalOpen} // Placeholder function, replace with actual logic if needed
          />

        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ProductDetailsModal