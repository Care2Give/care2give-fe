import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

const Introduction = () => {
  return (
    <div className="xl:flex">
      <section className="h-full w-full bg-[#5185FF] flex flex-col gap-6 p-10 items-center xl:min-h-[688px]">
        <h2
          className={`text-4xl text-white text-center ${arabotoBold.className}`}
        >
          Do Good with Caregivers Alliance
        </h2>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          width={400}
          height={264}
          alt="placeholder"
        />
      </section>
      <section className="h-full w-full bg-[#F8DF71] flex flex-col gap-3 p-10 xl:min-h-[688px]">
        <h3 className={`text-2xl ${arabotoBold.className}`}>
          How Caregivers Alliance Changes Lives for the Better
        </h3>
        <p className={`text-sm ${montserrat.className}`}>
          Caregivers Alliance Limited (CAL) is a non-profit organisation in
          Singapore dedicated to meeting the needs of caregivers of persons with
          mental health issues through education, support networks, crisis
          support, tailored services, and self-care enablement.
        </p>
        <Button variant="link" className="justify-start p-0 underline">
          <a href="https://www.cal.org.sg/" className="flex items-center gap-2">
            Visit Our Website <ExternalLinkIcon height="22" width="22" />
          </a>
        </Button>
      </section>
    </div>
  );
};
export default Introduction;
