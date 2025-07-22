import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { capitalize } from "@/lib/string-formatter"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/types/product"

interface Props{
  product: Product
}

type sizeSpecification = {
  width: number,
  height: number
}

const ProductDetailsTable = ({
  product
}:Props) => {

  const mappedFormatedSpecification:{key:string,value:string}[] = Object.entries(product.specification).map(([key, value]) => {

    let newValue = value

    if(Array.isArray(value)) {
      newValue = value.join(", ")
    }

    if(key === "size" && typeof value === 'object' && value !== null) {
      newValue = `${(value as sizeSpecification).width} x ${(value as sizeSpecification).height} cm`
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
              <Button className="size-auto p-1 px-2">Add to Best Seller</Button>
              :
              <Button variant="destructive" className="size-auto p-1 px-2">Remove from Best Seller</Button>
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>New Arrivals?</TableHead>
          <TableCell className="flex flex-wrap justify-between items-center">
            {product.isNewArrivals ? "Ya":"Tidak"}
            {!product.isNewArrivals ? 
              <Button className="size-auto p-1 px-2">Add to New Arrivals</Button>
              :
              <Button variant="destructive" className="size-auto p-1 px-2">Remove from New Arrivals</Button>
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
          <TableHead>Harga</TableHead>
          <TableCell>Rp{formatCurrency(product.price)}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Diskon</TableHead>
          <TableCell>{(product.discount && product.discount+"%") || "-"}</TableCell>
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
  )
}

export default ProductDetailsTable