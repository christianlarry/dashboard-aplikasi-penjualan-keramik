import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useProductMutation } from "@/hooks/use-product-mutation"
import type { DiscountInput } from "@/validations/productsSchema"
import { discountValidation } from "@/validations/productsSchema"
import type { Product } from "@/types/product"

interface SetDiscountModalProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SetDiscountModal = ({ product, open, onOpenChange }: SetDiscountModalProps) => {
  const { updateProductDiscount } = useProductMutation()

  const form = useForm<DiscountInput>({
    resolver: zodResolver(discountValidation),
    defaultValues: {
      discount: product.discount || 0
    }
  })

  const onSubmit = async (data: DiscountInput) => {
    try {
      const result = await updateProductDiscount.mutateAsync({
        productId: product._id ?? "",
        body: { discount: data.discount }
      })

      if (result.status === 200) {
        toast.success("Diskon berhasil diperbarui!")
        onOpenChange(false)
      }
    } catch (err) {
      toast.error("Gagal mengatur diskon. Silakan coba lagi.")
      if(err instanceof Error) console.error(err.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atur Diskon Produk</DialogTitle>
          <DialogDescription>
            Masukkan persentase diskon untuk produk {product.name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Persentase Diskon (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      {...field}
                      value={field.value === null ? "" : field.value}
                      onChange={e => {
                        const value = e.target.value;
                        if (value === "") {
                          field.onChange(null); // Kirim null jika input kosong
                        } else {
                          field.onChange(Number(value)); // Konversi ke angka jika ada nilai
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={updateProductDiscount.isPending}
              >
                {updateProductDiscount.isPending ? "Menyimpan..." : "Simpan Diskon"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default SetDiscountModal