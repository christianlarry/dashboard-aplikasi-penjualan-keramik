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

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data);
    // Handle form submission logic here
  };
  
  const login = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    // Implement login logic here, e.g., API call
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
