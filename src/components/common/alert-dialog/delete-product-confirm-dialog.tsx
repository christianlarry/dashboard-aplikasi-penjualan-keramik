import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { Product } from "@/types/product"

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

  const handleDeleteProduct = ()=>{
    console.log("Delete product:", product._id);
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