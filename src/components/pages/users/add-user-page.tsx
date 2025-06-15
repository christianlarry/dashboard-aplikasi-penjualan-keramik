import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

const AddUserPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-bold">Tambah Pengguna Baru</h1>

      <div className="bg-muted/50 p-4 rounded-xl">
        <form className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <label>Nama Lengkap</label>
            <Input placeholder="Masukkan nama lengkap" />
          </div>

          <div className="space-y-2">
            <label>Email</label>
            <Input type="email" placeholder="Masukkan email" />
          </div>

          <div className="space-y-2">
            <label>Password</label>
            <Input type="password" placeholder="Masukkan password" />
          </div>

          <div className="space-y-2">
            <label>Role</label>
            <Select>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Tambah Pengguna
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddUserPage
