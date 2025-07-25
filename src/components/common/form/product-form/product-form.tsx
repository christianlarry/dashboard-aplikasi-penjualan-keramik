import { postProductValidation, type PostProduct } from "@/validations/productsSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { InputTags } from "@/components/ui/input-tags"
import { Checkbox } from "@/components/ui/checkbox"

interface Props{
  defaultValues: PostProduct,
  onSubmit: (data: PostProduct) => void
}

const ProductForm = forwardRef<HTMLFormElement,Props>(({
  defaultValues,
  onSubmit
},ref) => {

  const form = useForm<PostProduct>({
    defaultValues,
    resolver: zodResolver(postProductValidation),
  })

  return (
    <Form {...form}>
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:gap-12 md:grid-cols-2">

          <div className="flex flex-col gap-4">
            {/* Nama Produk */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <FormControl>
                    <Input placeholder="Keramik ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Deskripsi */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Deskripsi produk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Application */}
            <FormField
              control={form.control}
              name="application"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aplikasi</FormLabel>
                  <FormDescription>
                    Multiple Option, pisah dengan koma
                  </FormDescription>
                  <FormControl>
                    <InputTags
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Contoh: Lantai, Dinding"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Design */}
            <FormField
              control={form.control}
              name="design"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desain</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Plain, Stone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Size Width & Height */}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="sizeWidth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Lebar (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeHeight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tinggi (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warna</FormLabel>
                  <FormDescription>
                    Multiple Option, pisah dengan koma
                  </FormDescription>
                  <FormControl>
                    <InputTags
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Contoh: Hitam, Putih"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Finishing */}
            <FormField
              control={form.control}
              name="finishing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finishing</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Glossy, Matte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="flex flex-col gap-4">
            {/* Texture */}
            <FormField
              control={form.control}
              name="texture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tekstur</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Halus, Kasar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Brand */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga (Rp)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      value={field.value}
                      onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Discount */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diskon (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      {...field}
                      value={field.value}
                      onChange={e => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* isSlipResistant */}
            <FormField
              control={form.control}
              name="isSlipResistant"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Anti Slip</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* isWaterResistant */}
            <FormField
              control={form.control}
              name="isWaterResistant"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Tahan Air</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* isBestSeller */}
            <FormField
              control={form.control}
              name="isBestSeller"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Best Seller</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* isNewArrivals */}
            <FormField
              control={form.control}
              name="isNewArrivals"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Produk Baru</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Recommended */}
            <FormField
              control={form.control}
              name="recommended"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rekomendasi (Optional)</FormLabel>
                  <FormDescription>
                    Multiple Option, pisah dengan koma
                  </FormDescription>
                  <FormControl>
                    <InputTags
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Tambah rekomendasi produk"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


        </div>
      </form>
    </Form>
  )
})

export default ProductForm