"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { toast } from "sonner";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      toast.success("account registered successfully", {
        description: "you have bee registered successfuly, please signin",
      });
    }

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("registered");
    router.replace(newUrl.toString(), undefined);
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        toast.error("Invalid email or password", {
          description: "please check your email and password and try again",
        });
        return;
      }
      toast.success("signedIn successfully", {
        description: "you have been signed in successfully",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("An error occured, please try again later");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGithubSIgnIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* <div className="grid gap-2">
        <Button
          variant="outline"
          disabled={isLoading}
          onClick={handleGithubSIgnIn}
          className="cursor-pointer border border-neutral-200 dark:border-neutral-800"
        >
          Sign in with Github
        </Button>
        <Button
          variant="outline"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="cursor-pointer border border-neutral-200 dark:border-neutral-800"
        >
          Sign in with Google
        </Button>
      </div> */}
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            or continue with
          </span>
        </div>
      </div> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    disabled={isLoading}
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
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
                    placeholder="************"
                    disabled={isLoading}
                    type="password"
                    autoComplete="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {error && (
            <div className="text-sm text-destructive font-medium">{error}</div>
          )}

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}
