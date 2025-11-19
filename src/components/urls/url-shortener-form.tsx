"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlFormData, urlSchema } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { shortenUrl } from "@/server/actions/urls/shorten-url";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Copy } from "lucide-react";

export function UrlShortenerForm() {
  const router = useRouter();
  const pathName = usePathname();

  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: UrlFormData) => {
    setIsLoading(true);
    setError(null);
    setShortCode(null);
    setShortUrl(null);
    try {
      const formData = new FormData();
      formData.append("url", data.url);

      const response = await shortenUrl(formData);

      if (response.success && response.data) {
        setShortUrl(response.data.shortUrl);

        const shortCodeMatch = response.data.shortUrl.match(/\/r\/([^/]+)$/);

        if (shortCodeMatch && shortCodeMatch[1]) {
          setShortCode(shortCodeMatch[1]);
        }
      }
    } catch (error) {
      setError("An error occured now , please try again");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full max-w-2xl mx-auto ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="paste your long url here"
                        {...field}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    shortening...
                  </>
                ) : (
                  "shorten"
                )}
              </Button>
            </div>
            {error && (
              <div className="p-2 bg-red-100 text-red-500 rounded-full text-sm">
                {error}
              </div>
            )}

            {shortUrl && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Your Shortened url:
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="shrink-0"
                    />
                    <Button
                      variant="outline"
                      type="button"
                      onClick={copyToClipboard}
                      className="shrink-0"
                    >
                      <Copy className="size-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
