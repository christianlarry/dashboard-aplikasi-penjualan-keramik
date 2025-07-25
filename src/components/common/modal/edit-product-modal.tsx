import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CustomModalProps } from "@/types/modal"
import type { Product } from "@/types/product"
import ImageUpload from "../upload/ImageUpload"
import { useEffect, useRef, useState } from "react"
import AddProductForm from "../form/product-form/add-product-form"
import { useProductMutation } from "@/hooks/use-product-mutation"
import { toast } from "sonner"
import EditProductForm from "../form/product-form/edit-product-form"

interface Props extends CustomModalProps {
  product:Product
}

const EditProductModal = ({
  onOpenChange,
  open = false,
  product 
}:Props) => {
  
  // Product Mutation Hook
  const {uploadProductImage} = useProductMutation()

  // Ref
  const formRef = useRef<HTMLFormElement>(null)
  
  // Tab State
  const [tab, setTab] = useState<"data" | "image">("data")
  
  // Image Product File State
  const [imageFile,setImageFile] = useState<File | null>(null)

  // Effect untuk reset tab ketika dialog ditutup
  useEffect(()=>{
    if(!open){
      setTab("data")
    }
  },[open])

  // Handler ketika tombol simpan diklik
  const handleSaveBtnClick = () => {
    if (tab === "data") {
      formRef.current?.requestSubmit()
    }
  }

  // Handler ketika tombol upload gambar diklik
  const handleUploadGambarBtnClick = async ()=>{
    if(imageFile && product){
      try {
        const result = await uploadProductImage.mutateAsync({
          image: imageFile,
          productId: product._id ?? ""
        })

        if(result.status === 201){
          toast.success("Gambar produk berhasil diupload!")
          onOpenChange?.(false)
        }
      } catch (err) {
        toast.error(`Terjadi kesalahan saat mengupload gambar produk. ${err instanceof Error ? err.message : "Unknown error"}`)
      }
    }
  }

  
  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="md:max-w-3xl" onInteractOutside={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Edit Produk Keramik</DialogTitle>
            <DialogDescription>
              Ubah data produk keramik sesuai dengan informasi yang benar. Pastikan semua data terisi dengan lengkap.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={tab} onValueChange={v => setTab(v as "data" | "image")}>
            <TabsList className="mb-4">
              <TabsTrigger value="data">Data Produk</TabsTrigger>
              <TabsTrigger value="image">Upload Gambar</TabsTrigger>
            </TabsList>
            <TabsContent value="data">
              <section className="max-h-[60vh] overflow-y-auto">
                <EditProductForm
                  currentProduct={product}
                  ref={formRef}
                />
              </section>
            </TabsContent>
            <TabsContent value="image">
              <section className="max-h-[60vh] overflow-y-auto">
                {/* Komponen upload gambar di sini */}
                <ImageUpload
                  onChange={(file) => setImageFile(file)}
                />
              </section>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {tab === "data" ? "Cancel" : "Skip"}
              </Button>
            </DialogClose>
            {tab === "data" && (
              <Button type="button" onClick={handleSaveBtnClick}>
                Simpan Produk
              </Button>
            )}
            {tab === "image" && (
              <Button type="button" onClick={handleUploadGambarBtnClick} disabled={uploadProductImage.isPending}>
                Upload Gambar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default EditProductModal