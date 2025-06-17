import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { createPortal } from "react-dom"
import { useEffect } from "react"

export function LoadingScreen({
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scrolling when loading is done
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div
      className={cn(
        "flex items-center justify-center bg-background",
        "fixed inset-0 z-50",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner>Loading...</Spinner>
      </div>
    </div>, document.body
  )
}
