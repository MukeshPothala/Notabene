"use client";

import { SearchModal } from "@/components/custom-ui/SearchModal";
import { Spinner } from "@/components/custom-ui/Spinner";
import { Navigation } from "@/components/custom-ui/navigation";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchModal />
        {children}
      </main>
    </div>
  );
};

export default layout;
