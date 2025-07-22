import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useProductMutation } from "@/hooks/use-product-mutation"
import type { Product } from "@/types/product"
import { toast } from "sonner"

interface Props{
  onOpenChange?: (open: boolean) => void
  open?: boolean
  product: Product
}

const DeleteProductConfirmDialog = ({
  product,
  onOpenChange,
  open = false
}:Props) => {

  const {deleteProduct} = useProductMutation()

  const handleDeleteProduct = async ()=>{
    try {
      const result = await deleteProduct.mutateAsync(product._id ?? "")

      if(result.status === 200){
        toast.success(`Product ${product.name} berhasil dihapus!`)
      }
    } catch (err) {
      // handle error here
      toast.error(`Terjadi kesalahan saat menghapus produk: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Konfirmasi Penghapusan Data
          </AlertDialogTitle>
          <AlertDialogDescription>
            Yakin anda ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct} className="text-white bg-destructive hover:bg-destructive/80">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProductConfirmDialog