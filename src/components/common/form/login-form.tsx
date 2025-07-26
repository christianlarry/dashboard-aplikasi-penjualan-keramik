import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import Logo from "../../ui/logo/logo"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/validations/authSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { useState } from "react"
import { AxiosError } from "axios"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  // Login error state
  const [loginError, setLoginError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  const { login,isLoading } = useAuth() // Assuming useAuth is a custom hook that provides the login function

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      // Reset login error state
      setLoginError(null)

      const { token, user } = await login(data)

      if (token && user) {
        // Redirect to dashboard or perform any other action after successful login
        window.location.href = "/"; // Adjust the redirect path as needed
      }

    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
        
      form.resetField("password"); // Reset password field after failed login

      if (err instanceof AxiosError && err.response) {
        // Handle specific error responses

        if (err.response.status === 400 && err.response.data.error.message === "Validation Error") {
          // Handle validation error
          const errors = err.response.data.error.errors as Array<{ field: string; message: string }>;
          const errorMap: Record<string, string[]> = {};
          errors.forEach(error => {
            if (!errorMap[error.field]) {
              errorMap[error.field] = [];
            }
            errorMap[error.field].push(error.message);
          });

          // Set form errors for username and password fields
          if (errorMap.username) {
            form.setError("username", {
              type: "manual",
              message: errorMap.username.join(", ") // Assuming the first error is the most relevant
            });
          }

          if(errorMap.password) {
            form.setError("password", {
              type: "manual",
              message: errorMap.password.join(", ") // Assuming the first error is the most relevant
            });
          }
          
          // Set login error state to display a generic error message
          setLoginError("Login failed due to validation errors. Please check your credentials and try again.");
        } else {
          const errorMessage = err.response.data.error.message;
          // Set login error state to display a generic error message
          setLoginError(errorMessage || "Login failed. Please check your credentials and try again.");
        }
      } else {
        setLoginError("An unexpected error occurred. Please try again later.");

        // Set form errors for username and password fields
        // This will display the error messages below the respective fields
        form.setError("username", {
          type: "manual",
          message: "Login failed. Please check your credentials and try again."
        });
        form.setError("password", {
          type: "manual",
          message: "Login failed. Please check your credentials and try again."
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center flex flex-col items-center gap-4">
          <Link to="#" className="flex items-center justify-center gap-2 self-center font-medium">
            <div className="w-32">
              <Logo />
            </div>
          </Link>
          <div>
            <CardTitle className="text-xl">Selamat Datang</CardTitle>
            <CardDescription>
              Masuk ke akun Anda untuk melanjutkan ke dashboard Admin
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: johndoe123"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
          
          {loginError && (
            <Alert variant="destructive" className="p-0 border-0 mt-4">
              <AlertCircleIcon />
              <AlertTitle>Login gagal</AlertTitle>
              <AlertDescription>
                <p>{loginError}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
