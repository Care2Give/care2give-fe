import Image from "next/image";
// import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

type NavBarProps = {
  title: String;
  titleIsCenterAligned?: Boolean;
};

const NavBar = ({ title, titleIsCenterAligned = false }: NavBarProps) => {
  const router = useRouter();

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4">
      {!titleIsCenterAligned && (
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={() => router.back()}
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
      <Button variant="ghost" size="icon" className="">
        <Image
          src="/navbar/gift_basket.svg"
          alt="Gift basket icon"
          height={24}
          width={24}
        />
      </Button>
    </nav>
  );
};

export default NavBar;
