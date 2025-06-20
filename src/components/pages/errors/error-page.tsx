import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useRouteError, isRouteErrorResponse, Link } from "react-router"

const ErrorPage = () => {
  const error = useRouteError()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  let message = "An unexpected error occurred"
  let status: number | undefined
  let statusText: string | undefined

  if (isRouteErrorResponse(error)) {
    status = error.status
    statusText = error.statusText
    message = error.data?.message || statusText || message
  } else if (error instanceof Error) {
    message = error.message
  } else if (typeof error === "string") {
    message = error
  }

  return createPortal(
    <div className="fixed inset-0 bg-background z-50">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <XCircle className="h-10 w-10 text-destructive" />
          <h1 className="text-2xl font-bold tracking-tight">
            Oops! Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              window.location.reload()
            }}
          >
            Refresh Page
          </Button>
          <Button>
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ErrorPage