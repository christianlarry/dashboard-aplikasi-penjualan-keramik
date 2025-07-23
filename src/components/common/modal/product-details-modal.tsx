import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import type { CustomModalProps } from "@/types/modal"
import type { Product } from "@/types/product"
import ProductDetailsTable from "../table/product-details-table"
import { Button } from "@/components/ui/button"
import { getProductImgUrl } from "@/lib/utils"
import { toast } from "sonner"
import DeleteProductConfirmDialog from "../alert-dialog/delete-product-confirm-dialog"
import { useState } from "react"


interface Props extends CustomModalProps{
  product: Product
}

const ProductDetailsModal = ({
  open = false,
  onOpenChange,
  product
}:Props) => {

  const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState<boolean>(false)


  const handleLihatGambar = ()=>{
    if(product.image){
      window.open(getProductImgUrl(product.image), "_blank")
    }else{
      toast.error(`Gambar produk "${product.name}" tidak tersedia.`)
    }
  }

  const handleEditBtnClick = ()=>{}

  const handleDeleteBtnClick = ()=>{
    setIsDeleteDialogOpen(true)
  }
  
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

        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ProductDetailsModal