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
    <nav className="w-full flex justify-between items-center px-4 py-2 fixed bg-white z-50">
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
          <>
            <Image
              src="/navbar/logo.png"
              alt="Caregivers Alliance Logo"
              className="max-h-14 max-w-14"
              height={128}
              width={128}
            />
            <Image
              src="/navbar/caldsc.png"
              alt="C2G logo"
              className="max-h-12 max-w-12"
              height={64}
              width={64}
            />
          </>
        )}
        <h1 className="text-xl">{title}</h1>
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
