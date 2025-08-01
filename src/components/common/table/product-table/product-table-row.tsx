import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, getProductImgUrl } from "@/lib/utils";
import type { Product } from "@/types/product";
import { TbDots, TbTrash } from "react-icons/tb";
import { useState } from "react";
import DeleteProductConfirmDialog from "../../alert-dialog/delete-product-confirm-dialog";
import ProductDetailsModal from "../../modal/product-details-modal";
import EditProductModal from "../../modal/edit-product-modal";

interface Props {
  product: Product
}

const ProductTableRow = ({ product }: Props) => {

  // State
  const [isDetailsMenuOpen, setIsDetailsMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);

  return (
    <>
    
      <TableRow>
        <TableCell>
          <Avatar className="size-30 aspect-square rounded-lg">
            {product.image ?
              <AvatarImage src={getProductImgUrl(product.image)} alt={product.name} className="object-cover object-center" /> :
              <AvatarFallback className="rounded-lg">{product.name[0].toUpperCase()}</AvatarFallback>
            }
          </Avatar>
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex flex-col gap-1">
            <p>
              {product.name} / <span className="font-normal">{product.brand}</span>
            </p>
            {/* Tags untuk Best Seller & New Arrival */}
            <div className="flex gap-1">
              {product.isBestSeller && <Badge variant="default" className="bg-yellow-500">Best Seller</Badge>}
              {product.isNewArrivals && <Badge variant="default" className="bg-green-500">New</Badge>}
            </div>
          </div>
        </TableCell>
        {/* Product Specification Table Cell */}
        <TableCell>
          <div className="flex flex-col gap-1">
            <div className="flex">
              <span className="w-24 text-xs text-muted-foreground">Aplikasi</span>
              <span className="text-xs">{product.specification.application.join(", ")}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-xs text-muted-foreground">Warna</span>
              <span className="text-xs">{product.specification.color.join(", ")}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-xs text-muted-foreground">Desain</span>
              <span className="text-xs">{product.specification.design}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-xs text-muted-foreground">Finishing</span>
              <span className="text-xs">{product.specification.finishing}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-xs text-muted-foreground">Tekstur</span>
              <span className="text-xs">{product.specification.texture}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-xs text-muted-foreground">Anti Selip?</span>
              <span className="text-xs">{product.specification.isSlipResistant ? "Ya":"Tidak"}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-xs text-muted-foreground">Anti Air?</span>
              <span className="text-xs">{product.specification.isWaterResistant ? "Ya":"Tidak"}</span>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1">
            {product.recommended && product.recommended.map((val)=>(
              <span key={val} className="w-24 text-xs text-muted-foreground">{val}</span>
            ))}
          </div>
        </TableCell>
        <TableCell>{product.specification.size.width}x{product.specification.size.height} cm</TableCell>
        <TableCell>
          <div className="flex flex-col">
            {product.discount && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-sm text-red-500">
                  {product.discount}% off
                </span>
                <span className="text-muted-foreground">
                  Rp<span className="line-through">{formatCurrency(product.price)}</span>
                </span>
              </div>
            )}
            <span className="font-medium">Rp{formatCurrency(product.finalPrice)}</span>
          </div>
        </TableCell>
        <TableCell>{new Date(product.createdAt).toUTCString()}</TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="data-[state=open]:bg-muted text-muted-foreground flex"
                  size="icon"
                >
                  <TbDots />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={()=>setIsDetailsMenuOpen(true)}>Details</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setIsEditMenuOpen(true)}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={()=>setIsDeleteMenuOpen(true)}>
                  <TbTrash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TableCell>
      </TableRow>

      {/* This is alert dialog Components */}

      <DeleteProductConfirmDialog
        product={product}
        onOpenChange={(open)=>setIsDeleteMenuOpen(open)} 
        open={isDeleteMenuOpen} 
      />

      <ProductDetailsModal
        product={product}
        open={isDetailsMenuOpen}
        onOpenChange={(open)=>setIsDetailsMenuOpen(open)}
      />

      <EditProductModal
        product={product}
        open={isEditMenuOpen}
        onOpenChange={(open)=>setIsEditMenuOpen(open)}
      />
    </>
  )
}

export default ProductTableRow;