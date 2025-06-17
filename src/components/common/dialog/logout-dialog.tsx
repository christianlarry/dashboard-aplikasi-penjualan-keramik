import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/auth-context";

const LogoutDialog = ({
  open=false,
  onOpenChange
}:{
  open?:boolean
  onOpenChange?: (open: boolean) => void
}) => {

  const {logout} = useAuth()

  const handleLogout = () => {
    // Implement your logout logic here
    logout();

    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Keluar dari akun anda?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan keluar dari akun anda. Apakah anda yakin ingin melanjutkan?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600" onClick={handleLogout}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LogoutDialog;