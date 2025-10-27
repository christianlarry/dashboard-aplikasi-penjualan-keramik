import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { capitalize } from "@/lib/string-formatter"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/types/product"
import ConfirmationDialog from "../alert-dialog/confirmation-dialog"
import { useState } from "react"
import { useProductMutation } from "@/hooks/use-product-mutation"
import { toast } from "sonner"
import SetDiscountModal from "../modal/set-discount-modal"

interface Props{
  product: Product
}

type SizeSpecification = {
  width: number,
  height: number
}

type ConfirmActionType = "addToBestSeller" | "removeFromBestSeller" | "addToNewArrivals" | "removeFromNewArrivals"

const ProductDetailsTable = ({
  product
}:Props) => {

  const [confirmAction,setConfirmAction] = useState<ConfirmActionType | null>(null)
  const [isSetDiscountModalOpen,setIsSetDiscountModalOpen] = useState<boolean>(false)

  const {updateProductFlags} = useProductMutation()

  // Handler untuk konfirmasi
  const handleConfirm = async () => {
    try {
      switch(confirmAction) {
        case "addToBestSeller": {

          const result = await updateProductFlags.mutateAsync({
            productId: product._id ?? "",
            body: { isBestSeller: true }
          })

          if(result.status === 200) {
            toast.success("Produk berhasil ditambahkan ke Best Seller.")
          }
        
          break;
        }

        case "removeFromBestSeller":{

          const result = await updateProductFlags.mutateAsync({
            productId: product._id ?? "",
            body: { isBestSeller: false }
          })

          if(result.status === 200) {
            toast.success("Produk berhasil di keluarkan dari Best Seller.")
          }
        
          break;
        }

        case "addToNewArrivals":{

          const result = await updateProductFlags.mutateAsync({
            productId: product._id ?? "",
            body: { isNewArrivals: true }
          })

          if(result.status === 200) {
            toast.success("Produk berhasil ditambahkan ke New Arrivals.")
          }
        
          break;
        }
        case "removeFromNewArrivals":{

          const result = await updateProductFlags.mutateAsync({
            productId: product._id ?? "",
            body: { isNewArrivals: false }
          })

          if(result.status === 200) {
            toast.success("Produk berhasil dikeluarkan dari New Arrivals.")
          }
        
          break;
        }
        default:
          setConfirmAction(null)
          break;
      }
    } catch (err) {
      console.log(err)
    }
  }

  const mappedFormatedSpecification:{key:string,value:string}[] = Object.entries(product.specification).map(([key, value]) => {

    let newValue = value

    if(Array.isArray(value)) {
      newValue = value.join(", ")
    }

    if(key === "size" && typeof value === 'object' && value !== null) {
      newValue = `${(value as SizeSpecification).width} x ${(value as SizeSpecification).height} cm`
    }

    if(typeof value === "boolean"){
      newValue = value ? "Ya" : "Tidak"
    }
    
    return {
      key: capitalize(key),
      value: newValue.toString()
    }
  })
  

  return (
    <>
      <Table>
        {/* <TableHeader>
          <TableRow>
            <TableHead>Detail</TableHead>
            <TableHead>Deskripsi</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableBody>
          <TableRow>
            <TableHead>Nama Produk</TableHead>
            <TableCell>{product.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Deskripsi</TableHead>
            <TableCell>{product.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableCell>{product.brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Best Seller?</TableHead>
            <TableCell className="flex flex-wrap justify-between items-center">
              {product.isBestSeller ? "Ya":"Tidak"}
              {!product.isBestSeller ? 
                <Button className="size-auto p-1 px-2" onClick={()=>setConfirmAction("addToBestSeller")}>Add to Best Seller</Button>
                :
                <Button variant="destructive" className="size-auto p-1 px-2" onClick={()=>setConfirmAction("removeFromBestSeller")}>Remove from Best Seller</Button>
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>New Arrivals?</TableHead>
            <TableCell className="flex flex-wrap justify-between items-center">
              {product.isNewArrivals ? "Ya":"Tidak"}
              {!product.isNewArrivals ? 
                <Button className="size-auto p-1 px-2" onClick={()=>setConfirmAction("addToNewArrivals")}>Add to New Arrivals</Button>
                :
                <Button variant="destructive" className="size-auto p-1 px-2" onClick={()=>setConfirmAction("removeFromNewArrivals")}>Remove from New Arrivals</Button>
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Spesifikasi</TableHead>
            <TableCell>
              <ul>
                {mappedFormatedSpecification.map(spec=>{
                  return (
                    <li key={spec.key} className="flex">
                      <span className="w-[150px]">{capitalize(spec.key)}</span>
                      <span>{spec.value}</span>
                    </li>
                  )
                })}
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Rekomendasi Untuk</TableHead>
            <TableCell>{product.recommended ? product.recommended.join(", ") : "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Isi per box</TableHead>
            <TableCell>{product.tilesPerBox} pcs</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Harga</TableHead>
            <TableCell>Rp{formatCurrency(product.price)}</TableCell>
          </TableRow>
          <TableRow onClick={()=>setIsSetDiscountModalOpen(true)}>
            <TableHead>Diskon</TableHead>
            <TableCell className="flex justify-between">
              <span>{(product.discount && product.discount+"%") || "-"}</span>
              <Button className="size-auto p-1 px-2">Atur Diskon</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Harga Final</TableHead>
            <TableCell>Rp{formatCurrency(product.finalPrice)}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>MetaData</TableHead>
            <TableCell>
              <ul>
                <li className="flex flex-wrap">
                  <span className="w-[100px]">createdAt</span>
                  <span>{new Date(product.createdAt).toUTCString()}</span>
                </li>
                <li className="flex flex-wrap">
                  <span className="w-[100px]">updatedAt</span>
                  <span>{new Date(product.updatedAt).toUTCString()}</span>
                </li>
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <ConfirmationDialog
        open={!!confirmAction}
        onOpenChange={(open)=>!open && setConfirmAction(null)}
        onConfirm={handleConfirm}
        title={confirmAction?.includes("add") ? "Konfirmasi Tambah" : "Konfirmasi Hapus"}
        description="Apakah Anda yakin ingin melanjutkan tindakan ini?"
      />

      <SetDiscountModal
        open={isSetDiscountModalOpen}
        onOpenChange={(open)=>!open && setIsSetDiscountModalOpen(false)}
        product={product}
      />
    </>
  )
}

export default ProductDetailsTable