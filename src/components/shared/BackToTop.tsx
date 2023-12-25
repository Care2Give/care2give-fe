import { ChevronUpIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 100 ? setShow(true) : setShow(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {show && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-28 right-4 rounded-full bg-[#F8DF71] p-2 border-0 hover:bg-[#F8DF71]"
          onClick={handleScrollToTop}
        >
          <ChevronUpIcon color="black" height={36} width={36} />
        </Button>
      )}
    </>
  );
}
