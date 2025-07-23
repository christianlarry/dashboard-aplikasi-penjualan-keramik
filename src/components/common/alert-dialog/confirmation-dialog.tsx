import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import type { CustomModalProps } from "@/types/modal"

interface Props extends CustomModalProps{
  onConfirm?: ()=>void
  confirmBtnText?: string
  description?:string,
  title?:string
}

const ConfirmationDialog = ({
  open = false,
  onOpenChange,
  onConfirm,
  confirmBtnText = "Konfirmasi",
  title = "Konfirmasi",
  description = "Yakin anda ingin melanjutkan tindakan ini?"
}:Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmBtnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationDialog