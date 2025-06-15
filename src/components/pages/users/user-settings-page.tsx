import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const UserSettingsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-bold">Pengaturan User</h1>

      <div className="bg-muted/50 p-4 rounded-xl">
        <div className="space-y-6 max-w-xl">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Keamanan</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Tambahkan lapisan keamanan tambahan ke akun
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Session Timeout</h3>
                <p className="text-sm text-muted-foreground">
                  Atur waktu timeout session
                </p>
              </div>
              <Input type="number" className="w-24" defaultValue={30} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Notifikasi</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi via email
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <Button>Simpan Pengaturan</Button>
        </div>
      </div>
    </div>
  )
}

export default UserSettingsPage
