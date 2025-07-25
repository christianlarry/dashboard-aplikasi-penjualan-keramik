import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import AddProductForm from "../form/product-form/add-product-form"
import type { CustomModalProps } from "@/types/modal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useEffect, useRef, useState } from "react"
import ImageUpload from "../upload/ImageUpload"
import { useProductMutation } from "@/hooks/use-product-mutation"
import { toast } from "sonner"
import type { Product } from "@/types/product"

const AddProductModal = ({
  open = false,
  onOpenChange
}: CustomModalProps) => { 

  // Ref
  const formRef = useRef<HTMLFormElement>(null)

  // Tab State
  const [tab, setTab] = useState<"data" | "image">("data")

  // Image Product File State
  const [imageFile,setImageFile] = useState<File | null>(null)

  const [newProduct,setNewProduct] = useState<Product | null>(null)

  // Product Mutation Hook
  const {uploadProductImage} = useProductMutation()

  // Effect untuk reset tab ketika dialog ditutup
  useEffect(()=>{
    if(!open){
      setTab("data")
      setNewProduct(null)
    }
  },[open])

  // Handler ketika produk berhasil disubmit
  const handleProductSubmitSuccess = (newProduct:Product) => {
    setTab("image")

    setNewProduct(newProduct)
  }

  // Handler ketika tombol simpan diklik
  const handleSaveBtnClick = () => {
    if (tab === "data") {
      formRef.current?.requestSubmit()
    }
  }

  // Handler ketika tombol upload gambar diklik
  const handleUploadGambarBtnClick = async ()=>{
    if(imageFile && newProduct){
      try {
        const result = await uploadProductImage.mutateAsync({
          image: imageFile,
          productId: newProduct._id ?? ""
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
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <DialogPortal>
        <DialogContent className="md:max-w-3xl" onInteractOutside={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Tambah Produk Keramik</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk menambahkan produk baru ke dalam database.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={tab} onValueChange={v => setTab(v as "data" | "image")}>
            <TabsList className="mb-4">
              <TabsTrigger value="data" disabled={tab != "data"}>Data Produk</TabsTrigger>
              <TabsTrigger value="image" disabled={tab != "image"}>Upload Gambar</TabsTrigger>
            </TabsList>
            <TabsContent value="data">
              <section className="max-h-[60vh] overflow-y-auto">
                <AddProductForm
                  ref={formRef}
                  onSuccess={handleProductSubmitSuccess}
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

export default AddProductModal