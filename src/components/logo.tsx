import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-1", className)}>
      <LogoIcon />
      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        ShortUrl
      </span>
    </Link>
  );
};

export const LogoIcon = (props: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      id="logo-35"
      width="50"
      height="39"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {" "}
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        className="ccompli1"
        fill="#007AFF"
      ></path>{" "}
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        className="ccustom"
        fill="#312ECB"
      ></path>{" "}
    </svg>
  );
};
