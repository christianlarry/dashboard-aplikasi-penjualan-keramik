import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import AddProductForm from "../form/add-product-form"
import type { CustomModalProps } from "@/types/modal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useRef, useState } from "react"
import ImageUpload from "../upload/ImageUpload"

const AddProductModal = ({
  open = false,
  onOpenChange
}: CustomModalProps) => {  
  const formRef = useRef<HTMLFormElement>(null)
  const [tab, setTab] = useState<"data" | "image">("data")

  // Handler ketika produk berhasil disubmit
  const handleProductSubmitSuccess = () => {
    setTab("image")
  }

  const handleSaveBtnClick = () => {
    if (tab === "data") {
      formRef.current?.requestSubmit()
    }
    // Untuk tab image, bisa tambahkan handler upload gambar di sini
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

          <Tabs value={tab} onValueChange={v => setTab(v as "data" | "image")}>
            <TabsList className="mb-4">
              <TabsTrigger value="data">Data Produk</TabsTrigger>
              <TabsTrigger value="image">Upload Gambar</TabsTrigger>
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
                <ImageUpload/>
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
              <Button type="button">
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