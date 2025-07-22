import {AnimatePresence, motion} from "framer-motion"
import ProductTable from "@/components/common/table/product-table/product-table"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Grid2X2, PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { TbInfoCircle } from "react-icons/tb"
import { useLocation } from "react-router"
import AddProductModal from "@/components/common/modal/add-product-modal"
import { useProductQuery } from "@/hooks/use-product-query"


const AllProductsPage = () => {

  // State management for products
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [searchKeyword,setSearchKeyword] = useState<string | undefined>(undefined)

  // State for add product dialog
  const [isAddProductModalShow, setIsAddProductModalShow] = useState<boolean>(false)

  const { data, isLoading } = useProductQuery({
    page,
    size,
    search:searchKeyword
  })

  // Location
  const location = useLocation()

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)

    setSearchKeyword(searchParams.get("search") || undefined)
    setPage(searchParams.get("page") ? Number(searchParams.get("page")) : 1)
    setSize(searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 10)

  },[location])

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-2 text-sm text-primary font-medium">
              <Grid2X2 size={16} />
              Total Produk
            </CardDescription>
            <CardTitle className="font-bold text-3xl">
              {data ? data.page.total : 0} item
            </CardTitle>
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
              <Button className="cursor-pointer" onClick={()=>setIsAddProductModalShow(true)}>
                <PlusCircle/>
                Tambah Produk
              </Button>

              <AddProductModal open={isAddProductModalShow} onOpenChange={(val)=>setIsAddProductModalShow(val)}/>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? 
          <div className="flex-1 flex items-center justify-center">
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-center">
                <Spinner>Loading...</Spinner>
              </div>
            </motion.div>
          </div>
          :
          <motion.div
            key="productTable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductTable 
              products = {data ? data.data:[]}
              pagination = {data?.page}
            />
          </motion.div>
        }
      </AnimatePresence>
      
    </div>
  )
}

export default AllProductsPage
