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
import { loginSchema } from "@/validations/loginSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from "@/contexts/auth-context"
import { AxiosError } from "axios"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })

  const { login } = useAuth() // Assuming useAuth is a custom hook that provides the login function

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const {token,user} = await login(data)

      if (token && user) {
        // Redirect to dashboard or perform any other action after successful login
        window.location.href = "/"; // Adjust the redirect path as needed
      }

    } catch (err) {
      console.error("Login error:", err);

      // if(err instanceof AxiosError && err.response) {
      //   // Handle specific error responses

      //   if(err.response.status === 400 && err.response.data.error.message === "Validation Error") {
      //     // Handle validation error
      //     const errors = err.response.data.error.errors;
          
      //     console.log("Validation errors:", errors);
      //   }
      // }

      // You can show an error message to the user here
      alert("Login failed. Please check your credentials and try again.");

      form.resetField("password"); // Reset password field after failed login

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
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
