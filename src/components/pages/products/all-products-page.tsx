import { LoadingScreen } from "@/components/common/loading-screen"
import ProductTable from "@/components/common/table/product-table"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import useProduct from "@/hooks/use-product"
import { Grid2X2 } from "lucide-react"
import { useEffect } from "react"
import { TbInfoCircle } from "react-icons/tb"


const AllProductsPage = () => {

  const {getProducts} = useProduct()
  const {data,isLoading,error} = getProducts

  useEffect(()=>{
    console.log("Fetched products:", data)
    // You can perform additional actions with the fetched data here
  }, [data])

  if(isLoading) return <LoadingScreen/>

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-2 text-sm text-primary font-medium">
              <Grid2X2 size={16}/>
              Total Produk
            </CardDescription>
            <CardTitle className="font-bold text-3xl">100</CardTitle>
            <CardAction>
              <Tooltip>
                <TooltipTrigger>
                  <TbInfoCircle size={20} className="cursor-pointer text-muted-foreground"/>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Total produk keramik di database</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <ProductTable/>
    </div>
  )
}

export default AllProductsPage
