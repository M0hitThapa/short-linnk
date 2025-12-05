import { Button } from "@/components/ui/button";
import { getUrlByShortCode } from "@/server/actions/urls/get-url";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Redirecting...",
  description: "You are being redirected to the original URL",
};

type Params = Promise<{ shortCode: string }>;

export default async function RedirectPage(props: { params: Params }) {
  const { shortCode } = await props.params;

  const response = await getUrlByShortCode(shortCode);

  if (response.success && response.data) {
    redirect(response.data.originalUrl);
  }

  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="size-8 text-destructive" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-destructive mb-4">
          URL Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          The short link you&apos;re trying to access doesn&apos;t exist or has
          been removed.
        </p>
        <Button asChild>
          <Link href={"/"}>Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
