import { capitalize } from "@/lib/string-formatter"
import {z} from "zod"

export const postProductValidation = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().optional(),
  application: z
    .array(z.string().transform(val => capitalize(val)))
    .min(1, "Minimal 1 aplikasi produk"),
  design: z
    .string()
    .min(1, "Desain produk wajib diisi")
    .transform(val => capitalize(val)),
  sizeWidth: z
    .number()
    .positive("Lebar produk harus lebih dari 0"),
  sizeHeight: z
    .number()
    .positive("Tinggi produk harus lebih dari 0"),
  color: z
    .array(z.string().transform(val => capitalize(val)))
    .min(1, "Minimal 1 warna produk"),
  finishing: z
    .string()
    .min(1, "Finishing produk wajib diisi")
    .transform(val => capitalize(val)),
  texture: z
    .string()
    .min(1, "Tekstur produk wajib diisi")
    .transform(val => capitalize(val)),
  brand: z
    .string()
    .min(1, "Brand produk wajib diisi")
    .transform(val => capitalize(val)),
  price: z
    .number()
    .nonnegative("Harga produk tidak boleh negatif"),
  tilesPerBox: z
    .number()
    .nonnegative("Jumlah ubin dalam box tidak boleh negatif"),
  discount: z
    .number()
    .nonnegative("Diskon tidak boleh negatif")
    .min(0, "Diskon minimal 0%")
    .max(100, "Diskon maksimal 100%")
    .optional(),
  isSlipResistant: z.boolean(),
  isWaterResistant: z.boolean(),
  isBestSeller: z.boolean().optional(),
  isNewArrivals: z.boolean().optional(),
  recommended: z.array(z.string().transform(val => capitalize(val))).optional()
})

export const putProductValidation = postProductValidation

export const discountValidation = z.object({
  discount: z
    .number({ invalid_type_error: "Diskon tidak boleh kosong dan harus berupa angka" })
    .min(0, "Diskon tidak boleh negatif")
    .max(100, "Diskon tidak boleh lebih dari 100%")
})

export type PostProduct = z.infer<typeof postProductValidation>
export type PutProduct = z.infer<typeof putProductValidation>
export type DiscountInput = z.infer<typeof discountValidation>