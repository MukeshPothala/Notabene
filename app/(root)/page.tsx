"use client";

import Logo from "@/components/custom-ui/Logo";
import { Spinner } from "@/components/custom-ui/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import React from "react";

import TypeWriter from "typewriter-effect";

const Page = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex flex-col flex-1 items-center justify-center md:justify-start px-6 pb-10 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
            Think it. Note it. Do it
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold underline">
            Notabene
          </h1>
          <h3 className="text-lg font-semibold text-muted-foreground">
            <TypeWriter
              options={{
                strings: [
                  " Big ideas in your pocket! ✨ Write, sort, and find like magic! 🪄",
                  "Remember everything! Like a 🧠 brain organizer on rocket fuel! 🚀",
                  "Scribble, doodle, never forget! NotaBene",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>
          {isLoading && <Spinner size={"lg"} className="text-center w-full" />}
          {!isAuthenticated && !isLoading && (
            <SignInButton mode="modal">
              <Button size={"lg"}>
                Enter Notabene <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Button>
            </SignInButton>
          )}
          {isAuthenticated && !isLoading && (
            <Button size={"lg"} asChild>
              <Link href={"/documents"}>
                {" "}
                Enter Notabene <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <footer className="py-3 px-2 md:px-6 flex items-center w-full ">
        <Logo />
        <Button
          size={"sm"}
          variant={"ghost"}
          className="ml-auto text-muted-foreground"
        >
          Done by Mp
        </Button>
      </footer>
    </div>
  );
};

export default Page;
