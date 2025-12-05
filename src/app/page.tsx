import { UrlShortenerForm } from "@/components/urls/url-shortener-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col flex-1  items-center p-6 md:p-24 min-h-[93vh]">
      <div className=" relative w-full max-w-3xl mx-auto text-center ">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-shadow-2xs mb-4 bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-400 ">
          Shorten Your Link Instantly{" "}
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Paste your long URL below and get a clean,
          <br /> short link in seconds. It’s fast, free, and easy to use.
        </p>
        <UrlShortenerForm />
      </div>
    </div>
  );
}
