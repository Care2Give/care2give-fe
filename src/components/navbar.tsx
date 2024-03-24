import Image from "next/image";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import useCartStore from "@/stores/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavBarProps = {
  title: String;
  titleIsCenterAligned?: Boolean;
};

const NavBar = ({ title, titleIsCenterAligned = false }: NavBarProps) => {
  const [numItems, setNumItems] = useState(0);
  const { items } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    setNumItems(items.length);
  }, [items]);

  if (!items) return null;
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 fixed bg-white z-50">
      {!titleIsCenterAligned && (
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={() => router.back()}
          disabled={router.pathname.includes("/campaigns/preview")}
        >
          <ChevronLeftIcon height="24" width="24" color="black" />
        </Button>
      )}
      <div className="flex items-center gap-2">
        {router.pathname === "/" && (
          <Image
            src="./navbar/logo.svg"
            alt="Caregivers Alliance Logo"
            height={32}
            width={32}
          />
        )}
        <h1 className="text-2xl">{title}</h1>
      </div>
      <Link href="/gift-basket">
        <Button variant="ghost" size="icon">
          <Image
            src="/navbar/gift_basket.svg"
            alt="Gift basket icon"
            height={24}
            width={24}
          />
        </Button>
        <Badge className="absolute right-3 top-3 bg-blue-500 opacity-80 hover:bg-blue-500">
          {numItems}
        </Badge>
      </Link>
    </nav>
  );
};

export default NavBar;
