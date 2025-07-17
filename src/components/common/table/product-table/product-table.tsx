import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Product } from "@/types/product";
import ProductTableRow from "./product-table-row";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LucideX } from "lucide-react";
import type { Pagination as PaginationType } from "@/types/globalTypes";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { buildCurrentUrlWithParams } from "@/lib/utils";

interface Props {
  products: Product[]
  pagination?: PaginationType
}

const ProductTable = ({
  products,
  pagination
}: Props) => {

  // State
  const [search, setSearch] = useState<string>("")
  const [isSearched,setIsSearched] = useState<boolean>(false)

  // Handler
  const handleSearchInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const keyword = e.currentTarget.value

      if (keyword.length > 0) {
        onSearch(keyword)
      }

    }
  }

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    const searchVal = searchParams.get("search")

    if(searchVal){
      setSearch(searchVal)
      setIsSearched(true)
    }else{
      setSearch("")
      setIsSearched(false)
    }

  }, [location])

  // Handler Search

  const onSearch = (val: string) => {
    navigate(buildCurrentUrlWithParams(
      location,
      { "search": val }
    ))
  }

  const onPageChange = (val: number) => {
    navigate(buildCurrentUrlWithParams(
      location,
      { "page": val }
    ))
  }

  const onPageSizeChange = (val: number) => {
    navigate(buildCurrentUrlWithParams(
      location,
      { "pageSize": val }
    ))
  }

  const handleResetSearch = ()=>{
    navigate(buildCurrentUrlWithParams(
      location,
      {"search":undefined}
    ))
  }

  return (
    <div className="flex flex-col gap-4">

      {/* // Table Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Cari produk..."
            className="w-[250px]"
            onKeyDown={handleSearchInputKeyDown}
          />
          {isSearched &&
            <Button variant="ghost" className="cursor-pointer" onClick={handleResetSearch}>
              Reset <LucideX/>
            </Button>
          }
        </div>
      </div>

      {/* // Product Table */}
      <div className="relative">
        <div className="border rounded-lg">
          { products.length > 0 ? 
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Nama Produk / Brand</TableHead>
                  <TableHead>Spesifikasi</TableHead>
                  <TableHead>Digunakan di</TableHead>
                  <TableHead>Ukuran</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <ProductTableRow key={product._id} product={product} />
                ))}
              </TableBody>
            </Table>
          :
            <div className="flex w-full items-center justify-center p-4">
              <h3 className="font-semibold">Produk tidak ada:(</h3>
            </div>
          }
        </div>
      </div>

      {/* // Pagination */}
      {pagination &&
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
          <div className="flex-1 flex items-center gap-2">
            <Label htmlFor="pageSizeInput" className="font-medium text-sm whitespace-nowrap">Baris per halaman</Label>
            <Select
              value={String(pagination.size)}
              onValueChange={(val) => {
                onPageSizeChange(parseInt(val))
              }}
            >
              <SelectTrigger id="pageSizeInput">
                <SelectValue className="text-sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">

            <p className="text-muted-foreground text-sm sm:block hidden whitespace-nowrap">Halaman {pagination.current} dari {pagination.totalPages}</p>


            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    className="aspect-square size-8"
                    variant="outline"
                    onClick={() => onPageChange(1)}
                    disabled={pagination.current == 1}
                  >
                    <ChevronsLeft />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    className="aspect-square size-8"
                    variant="outline"
                    onClick={() => onPageChange(pagination.current - 1)}
                    disabled={pagination.current == 1}
                  >
                    <ChevronLeft />
                  </Button>
                </PaginationItem>

                <PaginationItem>
                  <Button
                    className="aspect-square size-8"
                    variant="outline"
                    onClick={() => onPageChange(pagination.current + 1)}
                    disabled={pagination.current == pagination.totalPages}
                  >
                    <ChevronRight />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    className="aspect-square size-8"
                    variant="outline"
                    onClick={() => onPageChange(pagination.totalPages)}
                    disabled={pagination.current == pagination.totalPages}
                  >
                    <ChevronsRight />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </div>
        </div>
      }
    </div>
  )
}

export default ProductTable;