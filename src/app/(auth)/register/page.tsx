import RegisterForm from "@/components/auth/register-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function RegisterPage() {
  return (
    <div className=" items-center justify-center h-screen w-screen container flex flex-col">
      <div className="sm:max-w-[350px] w-full mx-auto flex flex-col justify-center space-y-6">
        <div className="flex flex-col text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account{" "}
          </p>
        </div>
        <Card className="border border-neutral-200 dark:border-neutral-800">
          <CardHeader className="space-y-1">
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Fill your details to create your account{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
