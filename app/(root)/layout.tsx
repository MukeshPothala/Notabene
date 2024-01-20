"use client";
import Logo from "@/components/custom-ui/Logo";
import { Spinner } from "@/components/custom-ui/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="h-full">
      <header className="flex py-4 px-2 md:px-6 fixed top-0 bg-background items-center w-full md:justify-between">
        <Logo />
        <div className="flex items-center gap-x-3 justify-between w-full md:justify-end">
          {isLoading && <Spinner className="text-center max-md:w-full" />}
          {!isLoading && !isAuthenticated && (
            <>
              <SignInButton mode="modal">
                <Button size={"sm"} variant={"outline"}>
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant={"default"} size={"sm"}>
                  Enter Notabene free
                </Button>
              </SignUpButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <UserButton afterSignOutUrl="/" />
              <Button
                variant={"ghost"}
                size={"sm"}
                className="text-muted-foreground font-semibold"
                asChild
              >
                <Link href={"/documents"}>Enter Notabene</Link>
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="h-full pt-32 md:pt-56">{children}</main>
    </div>
  );
};

export default layout;
