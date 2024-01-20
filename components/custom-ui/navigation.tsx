"use client";

import { MenuIcon, PlusCircleIcon, Search, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/clerk-react";
import { UserItem } from "./UserItem";
import SidebarItem from "./SidebarItem";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import DocumentsList from "./DocumentsList";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { TrashBox } from "./TrashBox";
import { useSearch } from "@/hooks/useSearchHook";
import { Navbar } from "./Navbar";

export const Navigation = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const search = useSearch();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

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

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "288px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 288px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "288px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-72 flex-col z-[9999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-8 w-8 flex items-center justify-center text-muted-foreground rounded-full hover:bg-neutral-200  absolute top-2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <Cross2Icon className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <hr className="mb-2" />
          <SidebarItem
            onClick={search.onOpen}
            label="Search"
            Icon={Search}
            isSearch={true}
          />
          <SidebarItem
            onClick={createNoteFn}
            label="New page"
            Icon={PlusCircleIcon}
          />
        </div>
        <hr className="my-2" />
        <div>
          <DocumentsList />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <SidebarItem label="Trash" Icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-72 w-[calc(100%-288px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.docID ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
