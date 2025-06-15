import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const UserRolesPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role & Permissions</h1>
        <Button>Tambah Role</Button>
      </div>

      <div className="bg-muted/50 p-4 rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Role</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Jumlah User</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Admin</TableCell>
              <TableCell>Full access to all features</TableCell>
              <TableCell>All permissions</TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Staff</TableCell>
              <TableCell>Limited access to features</TableCell>
              <TableCell>View, Create, Edit</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UserRolesPage
