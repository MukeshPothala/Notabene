"use client";
import { Id } from "@/convex/_generated/dataModel";
import { LucideIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface SidebarProps {
  id?: Id<"documents">;
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
  active?: boolean;
  documentIcon?: string;
  isSearch?: boolean;
}

const SidebarItem = ({
  id,
  active,
  documentIcon,
  label,
  Icon,
  onClick,
  isSearch,
}: SidebarProps) => {
  const archive = useMutation(api.documents.archive);
  const router = useRouter();

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "group min-h-[32px] text-sm py-1 px-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer",
        active && "bg-primary/5 text-primary"
      )}
    >
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[20px] w-[20px] mr-2 text-muted-foreground" />
      )}
      <p className="truncate">{label}</p>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K | <span>ctrl</span>K
        </kbd>
      )}
      {!!id && (
        <div
          onClick={onArchive}
          role="button"
          className="group/trashbutton opacity-0 group-hover:opacity-100 h-full ml-auto rounded-md hover:bg-red-500 p-2"
        >
          <Trash2Icon className="h-4 w-4 text-muted-foreground group-hover/trashbutton:text-white" />
        </div>
      )}
    </div>
  );
};

SidebarItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div className="flex gap-x-2 py-[3px] pl-3">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
export default SidebarItem;
