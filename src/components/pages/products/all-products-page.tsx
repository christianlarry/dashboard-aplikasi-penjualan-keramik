import { LoadingScreen } from "@/components/common/loading-screen"
import ProductTable from "@/components/common/table/product-table"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import useProduct from "@/hooks/use-product"
import { Grid2X2, PlusCircle } from "lucide-react"
import { useState } from "react"
import { TbInfoCircle } from "react-icons/tb"


const AllProductsPage = () => {

  // State management for products
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [searchKeyword,setSearchKeyword] = useState<string | undefined>(undefined)

  const { getProducts } = useProduct({
    page,
    size,
    search:searchKeyword
  })

  const { data, isLoading } = getProducts

  if (isLoading) return <LoadingScreen />

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-2 text-sm text-primary font-medium">
              <Grid2X2 size={16} />
              Total Produk
            </CardDescription>
            <CardTitle className="font-bold text-3xl">{data ? data.page.total : 0} item</CardTitle>
            <CardAction>
              <Tooltip>
                <TooltipTrigger>
                  <TbInfoCircle size={20} className="cursor-pointer text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Total produk keramik di database</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
            <CardFooter className="px-0 mt-2">
              <Button>
                <PlusCircle/>
                Tambah Produk
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>

      <ProductTable 
        products = {data ? data.data : []}
        pagination = {data?.page}
        onPageChange = {(val)=>setPage(val)}
        onSearch={(val)=>setSearchKeyword(val)}
        onPageSizeChange={(val)=>setSize(val)}
      />

      
    </div>
  )
}

export default AllProductsPage
