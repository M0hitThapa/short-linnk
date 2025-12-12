"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  BarChart3Icon,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ThemeToggle } from "../ui/theme-toggle";
import { Logo } from "../logo";

export function Header() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <header className="relative max-w-5xl mx-auto">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button variant={"ghost"} size={"sm"} asChild className="">
            <Link href={"/stats"} className="flex items-center gap-1">
              <BarChart3Icon className="size-4" />
              Stats
            </Link>
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant={"ghost"} size={"sm"} asChild>
                <Link href={"/dashboard"} className="flex items-center gap-1">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </Button>

              <Button variant={"ghost"} size={"sm"} asChild>
                <Link
                  href={"/dashboard/stats"}
                  className="flex items-center gap-1"
                >
                  <LayoutDashboard className="size-4" />
                  My Stats
                </Link>
              </Button>

              <Button
                onClick={() => signOut()}
                className="cursor-pointer rounded "
              >
                <LogOut className="size-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="cursor-pointer rounded">
                <Link href={"/login"} className="flex items-center gap-1">
                  <LogIn className="size-4" />
                  Sign In
                </Link>
              </Button>

              <Button asChild className="cursor-pointer rounded">
                <Link href={"/register"} className="flex items-center gap-1">
                  <UserPlus className="size-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 md:hidden">
          {/* TODO: add theme toggle here */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <Button variant={"ghost"} size={"sm"} asChild>
                  <Link
                    href={"/stats"}
                    className="flex items-center gap-2 justify-start w-full"
                  >
                    <BarChart3Icon className="size-4" />
                    Stats
                  </Link>
                </Button>

                {isAuthenticated ? (
                  <>
                    <Button variant={"ghost"} size={"sm"} asChild>
                      <Link
                        href={"/dashboard"}
                        className="flex items-center gap-1"
                      >
                        <LayoutDashboard className="size-4" />
                        Dashboard
                      </Link>
                    </Button>

                    <Button variant={"ghost"} size={"sm"} asChild>
                      <Link
                        href={"/dashboard/stats"}
                        className="flex items-center gap-1"
                      >
                        <LayoutDashboard className="size-4" />
                        My Stats
                      </Link>
                    </Button>

                    <Button
                      onClick={() => signOut()}
                      className="cursor-pointer rounded "
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild className="cursor-pointer rounded">
                      <Link href={"/login"} className="flex items-center gap-1">
                        <LogIn className="size-4" />
                        Sign In
                      </Link>
                    </Button>

                    <Button asChild className="cursor-pointer rounded">
                      <Link
                        href={"/register"}
                        className="flex items-center gap-1"
                      >
                        <UserPlus className="size-4" />
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
