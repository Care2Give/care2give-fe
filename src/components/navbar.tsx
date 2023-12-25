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
      {/* <Button variant="ghost" size="icon">
        <HamburgerMenuIcon height="24" width="24" color="white" />
      </Button> */}
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
      <h1 className="text-2xl">{title}</h1>
      {/* <div className="flex gap-2"> */}
      <Button variant="ghost" size="icon" className="">
        <Image
          src="/navbar/gift_basket.svg"
          alt="Gift basket icon"
          height={24}
          width={24}
        />
      </Button>
      {/* <Button variant="ghost" size="icon">
        <Image
          src="./navbar/profile.svg"
          alt="Profile icon"
          height={24}
          width={24}
        />
      </Button> */}
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
