import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import type { CustomModalProps } from "@/types/modal"
import type { Product } from "@/types/product"
import ProductDetailsTable from "../table/product-details-table"
import { Button } from "@/components/ui/button"
import { getProductImgUrl } from "@/lib/utils"
import { toast } from "sonner"


interface Props extends CustomModalProps{
  product: Product
}

const ProductDetailsModal = ({
  open = false,
  onOpenChange,
  product
}:Props) => {
  if (!open) return null

  const handleLihatGambar = ()=>{
    if(product.image){
      window.open(getProductImgUrl(product.image), "_blank")
    }else{
      toast.error("Gambar produk tidak tersedia.")
    }
  }
  
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="lg:max-w-3xl">

          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>Lihat semua informasi produk keramik. Seluruh data produk tertera pada tabel dibawah ini.</DialogDescription>
          </DialogHeader>
          
          <section>
            <Button variant="outline" onClick={handleLihatGambar}>Lihat Gambar</Button>
          </section>

          <section>
            <ProductDetailsTable product={product}/>
          </section>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ProductDetailsModal