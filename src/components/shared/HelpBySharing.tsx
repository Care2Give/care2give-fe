import { Montserrat } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import localFont from "next/font/local";
import Image from "next/image";
import { Share1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

const araboto = localFont({
  src: "../../../public/fonts/araboto/Araboto Medium 400.ttf",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const HelpBySharing = () => {
  const [open, setOpen] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Share1Icon height={28} width={28} color="black" />
      </DialogTrigger>
      <DialogContent className="border-none overflow-hidden p-0 rounded-xl sm:rounded-xl w-96">
        <DialogHeader>
          <DialogDescription className="p-0 overflow-auto bg-white text-black">
            <div className="grid grid-rows-2">
              <Image
                className="object-cover h-[300px] w-full"
                src="/popup/popup_image.png"
                alt="popup image"
                width={384}
                height={300}
              />
              <div className="leading-5 p-10">
                <h2
                  className={`font-black text-3xl text-center p-2 ${araboto.className}`}
                >
                  Help by sharing
                </h2>
                <p
                  className={`text-[#262626] text-base text-center ${montserrat.className}`}
                >
                  Share the love; let&apos;s show our support together!
                </p>
                <div className="flex gap-8 pt-16 justify-center">
                  <button onClick={handleCopyToClipboard}>
                    <Image
                      src="/popup/clipboard-copy.svg"
                      className="min-w-10 min-h-12 aspect-square object-contain object-center w-11 fill-white overflow-hidden self-stretch max-w-full"
                      alt="clipboard copy"
                      width={32}
                      height={32}
                    />
                  </button>
                  <button>
                    <Image
                      src="/popup/instagram.svg"
                      className="min-w-10 min-h-12 aspect-square object-contain object-center w-11 overflow-hidden self-stretch max-w-full"
                      alt="instagram"
                      width={32}
                      height={32}
                    />
                  </button>
                  <button>
                    <Image
                      src="/popup/twitter.svg"
                      className="min-w-10 min-h-12 aspect-[1.21] object-contain object-center w-[41px] stroke-[2px] stroke-blue-500 overflow-hidden self-center max-w-full my-auto"
                      alt="twitter"
                      width={32}
                      height={32}
                    />
                  </button>
                  <button>
                    <Image
                      src="/popup/facebook.svg"
                      className="min-w-6 min-h-12 aspect-[0.53] object-contain object-center w-5 stroke-2 stroke-blue-500 overflow-hidden self-center max-w-full my-auto"
                      alt="facebook"
                      width={32}
                      height={32}
                    />
                  </button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HelpBySharing;
