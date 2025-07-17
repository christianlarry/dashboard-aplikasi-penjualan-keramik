import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { postProductValidation, type PostProduct } from "@/validations/productsSchema"
import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const AddProductForm = () => {

  const form = useForm<PostProduct>({
    defaultValues: {
      name: "",
      description: "",
      application: [],
      design: "",
      sizeWidth: 0,
      sizeHeight: 0,
      color: [],
      finishing: "",
      texture: "",
      brand: "",
      price: 0,
      discount: undefined,
      isSlipResistant: false,
      isWaterResistant: false,
      isBestSeller: false,
      isNewArrivals: false,
      recommended: [],
    },
    resolver: zodResolver(postProductValidation),
  })

  const onSubmit = (data: PostProduct) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6"> 
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Keramik ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Simpan Produk</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default AddProductForm