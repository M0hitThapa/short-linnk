import { UrlShortenerForm } from "@/components/urls/url-shortener-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center p-6 md:p-24">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Shorten your link
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Paste your url and get a short one. Its free and easy to use paste
          your long url here
        </p>
        <UrlShortenerForm />
      </div>
    </div>
  );
}
