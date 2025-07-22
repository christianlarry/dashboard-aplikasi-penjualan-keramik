import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react"

interface ImageUploadProps {
  onChange?: (file: File | null) => void
}

const ImageUpload = ({ onChange }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange?.(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Pilih Gambar</Label>
        <Input
          ref={inputRef}
          id="picture" 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div
        className="bg-muted rounded-md flex items-center justify-center overflow-hidden cursor-pointer aspect-square"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover object-center w-full h-full" />
        ) : (
          <span className="text-muted-foreground text-sm font-semibold">Pilih gambar</span>
        )}
      </div>
    </div>
  )
}

export default ImageUpload