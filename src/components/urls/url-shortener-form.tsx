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
import { useState } from "react";
import { shortenUrl } from "@/server/actions/urls/shorten-url";
import { Card, CardContent } from "../ui/card";
import { Copy, Loader2 } from "lucide-react";
import { CopyIcon } from "../icons/copy";

export function UrlShortenerForm() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
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
    setShortUrl(null);
    try {
      const formData = new FormData();
      formData.append("url", data.url);

      const response = await shortenUrl(formData);

      if (response.success && response.data) {
        setShortUrl(response.data.shortUrl);
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
            <div className="flex flex-col sm:flex-row gap-2 ">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        className="h-11 bg-white border-2 border-neutral-300 dark:border-neutral-800 "
                        placeholder="paste your long url here"
                        {...field}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer rounded-sm h-11 "
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin " />
                    shortening...
                  </>
                ) : (
                  "short url"
                )}
              </Button>
            </div>
            {error && (
              <div className="p-2 bg-red-100 text-red-500 rounded-full text-sm">
                {error}
              </div>
            )}

            {shortUrl && (
              <Card className="border border-neutral-100 dark:border-neutral-800 ">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Your Shortened url:
                  </p>
                  <div className="flex items-center gap-2 ">
                    <Input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="shrink-0 max-w-[550px] h-12"
                    />
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="bg-neutral-100 border-2 border-neutral-200 dark:border-neutral-800 p-2 rounded-md dark:bg-neutral-900"
                    >
                      <CopyIcon className="text-neutral-800 dark:text-neutral-200" />
                    </button>
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
