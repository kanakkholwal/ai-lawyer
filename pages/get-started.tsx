import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import * as React from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { AiOutlineLoading } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),

  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password cannot exceed 50 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }
    ),
});


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();


  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    setIsLoading(true)

    toast.promise(SignUpWithEmail(data.name, data.email, data.password), {
      loading: 'Creating your account...',
      success: (data) => {
        console.log(data);
        setIsLoading(false)
        return 'Account created successfully!'
      },
      error: (err) => {
        console.log(err);
        setIsLoading(false)
        return err.message
      }
    })

  }
  async function SignUpWithEmail(name: string, email: string, password: string) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post("/api/auth/signup", { name, email, password })
            resolve(response.data)
        }
        catch (err) {
            reject(err)
        }
    })
}
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Rajat Singh"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field} />
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
                    id="password"
                    placeholder="*********"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <Button disabled={isLoading} type="submit" className="mt-4">
            {isLoading && (
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}
                  onClick={async() => {
                    setIsLoading(true);
                    await signIn('google', { callbackUrl: router.query.continue || "/app" })
                    setIsLoading(false);

                  }}

      >
        {isLoading ? (
          <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}

export const metadata: Metadata = {
  title: "AI lawyer | Get Started",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>

      <div className="container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 "
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <Link className="relative z-20 flex items-center text-lg font-medium" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            AI Lawyer
          </Link>
          <div className="relative z-20 m-auto">
            <Image src="/assets/getting-started.png" width={500} height={500} alt="hero" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;I{`'`}ve saved hours of tedious legal work using this platform. It has made handling legal matters a breeze..&rdquo;
              </p>
              <footer className="text-sm">Aman Asrani</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="md:hidden">
            <Image
              src="/logo-dark.png"
              width={280}
              height={120}
              alt="Authentication"
              className="block dark:hidden"
            />
            <Image
              src="/logo-light.png"
              width={280}
              height={120}
              alt="Authentication"
              className="hidden dark:block"
            />
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Start your journey to simplified legal documentation.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}