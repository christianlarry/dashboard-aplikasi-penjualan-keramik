import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Table } from "lucide-react"
import { TbInfoCircle } from "react-icons/tb"

interface Props {
  title: string,
  description: string,
  onClick?: () => void
}

const ProductCategoryCard = ({
  title,
  description,
  onClick
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-3xl">
          {title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm font-medium">
          {description}
        </CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger>
              <TbInfoCircle size={20} className="cursor-pointer text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{title}</p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
        <CardFooter className="px-0 mt-8">
          <Button className="cursor-pointer" onClick={onClick}>
            <Table />
            Lihat Data
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}

export default ProductCategoryCard