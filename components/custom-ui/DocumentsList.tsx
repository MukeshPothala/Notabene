import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { FileIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

const DocumentsList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const documents = useQuery(api.documents.getAllDocuments);
  if (documents === undefined) {
    return <SidebarItem.Skeleton />;
  }
  if (documents.length === 0) {
    return (
      <p className={"hidden text-sm font-medium text-muted-foreground/80 pl-3"}>
        No pages inside
      </p>
    );
  }
  return (
    <>
      {documents.map((document) => (
        <div key={document._id}>
          <SidebarItem
            id={document._id}
            label={document.title}
            Icon={FileIcon}
            onClick={() => router.push(`/documents/${document._id}`)}
            documentIcon={document.icon}
            active={pathname.split("/")[2] === document._id}
          />
        </div>
      ))}
    </>
  );
};

export default DocumentsList;
