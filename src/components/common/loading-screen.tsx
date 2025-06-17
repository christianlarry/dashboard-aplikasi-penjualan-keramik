import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

export function LoadingScreen({
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    // Trigger enter animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      // Restore scrolling when loading is done
      document.body.style.overflow = "";
      setIsVisible(false);
    };
  }, []);

  return createPortal(
    <div
      className={cn(
        "flex items-center justify-center bg-background",
        "fixed inset-0 z-50",
        "transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      {...props}
    >
      <div className={cn(
        "flex flex-col items-center gap-4",
        "transition-transform duration-200",
        isVisible ? "translate-y-0" : "translate-y-4"
      )}>
        <Spinner>Loading...</Spinner>
      </div>
    </div>, 
    document.body
  )
}
