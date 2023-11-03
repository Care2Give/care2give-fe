import { ChevronLeft } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  title?: string;
  backLink?: string;
};

export default function AppBar({ title = "Title", backLink = "/" }: Props) {
  return (
    <nav className="flex justify-center items-center h-16">
      <Button
        asChild
        variant={"ghost"}
        size={"icon"}
        className={"absolute left-5"}
      >
        <Link href={backLink}>
          <ChevronLeft size={24} />
        </Link>
      </Button>
      <h1 className="text-2xl">{title}</h1>
    </nav>
  );
}
