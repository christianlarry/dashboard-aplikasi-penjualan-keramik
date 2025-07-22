import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import AddProductForm from "../form/add-product-form"
import type { CustomModalProps } from "@/types/modal"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

const AddProductModal = ({
  open = false,
  onOpenChange
}: CustomModalProps) => {  

  const formRef = useRef<HTMLFormElement>(null)

  const handleSaveBtnClick = ()=>{
    formRef.current?.requestSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="md:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tambah Produk Keramik</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk menambahkan produk baru ke dalam database.
            </DialogDescription>
          </DialogHeader>
          
          <section className="max-h-[80vh] overflow-y-auto">
            <AddProductForm ref={formRef}/>
          </section>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveBtnClick}>Simpan Produk</Button>
          </DialogFooter>

        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default AddProductModal