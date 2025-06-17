import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils";
import { TbDots } from "react-icons/tb";

const ProductTable = () => {
  return (
    <div className="relative">
      <div className="border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Ukuran</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar className="size-12 rounded-lg">
                  <AvatarImage src="/product/image" alt="Product" />
                  <AvatarFallback className="rounded-lg">P</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col gap-1">
                  <span>Roman Granit 60x60</span>
                  {/* Tags untuk Best Seller & New Arrival */}
                  <div className="flex gap-1">
                    {true && <Badge variant="default" className="bg-yellow-500">Best Seller</Badge>}
                    {true && <Badge variant="default" className="bg-green-500">New</Badge>}
                  </div>
                </div>
              </TableCell>
              <TableCell>Roman</TableCell>
              <TableCell>{`60x60 cm`}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  {true && (
                    <span className="text-sm line-through text-muted-foreground">
                      {formatCurrency(500000)}
                    </span>
                  )}
                  <span className="font-medium">{formatCurrency(450000)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={true ? "default" : "secondary"}>
                  {true ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Make a copy</DropdownMenuItem>
                      <DropdownMenuItem>Favorite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductTable;