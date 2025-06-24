import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogPortal } from "@/components/ui/dialog"

interface Props{
  open?:boolean
  onOpenChange?:(open:boolean)=>void
}

const AddProductModal = ({
  open=false,
  onOpenChange
}:Props)=>{

  if(!open) return null

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">Tambah Produk Keramik</h2>
          </DialogHeader>
          
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio est ratione recusandae aspernatur modi explicabo. Ad explicabo aperiam at minima veritatis, nulla odio laudantium aspernatur recusandae velit, totam et voluptas?
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Simpan Produk</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default AddProductModal