"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const createNoteFn = () => {
    const promise = create({ title: "Untitled note" }).then((docID) => {
      router.push(`/documents/${docID}`);
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex items-center justify-center flex-col gap-y-6">
      <Image
        src={"/think_it.webp"}
        width={320}
        height={320}
        alt="welcome image"
      />
      <h3 className="text-xl font-semibold text-muted-foreground">
        Welcome {user?.fullName}
      </h3>
      <Button onClick={createNoteFn} variant={"default"} size={"sm"}>
        <PlusCircledIcon className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default Page;
