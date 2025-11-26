import LoginForm from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LoginPage() {
  return (
    <div className=" items-center justify-center h-screen w-screen container flex flex-col">
      <div className="sm:max-w-[350px] w-full mx-auto flex flex-col justify-center space-y-6">
        <div className="flex flex-col text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the credentials to login into your account
          </p>
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose a sign in method to continue to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
