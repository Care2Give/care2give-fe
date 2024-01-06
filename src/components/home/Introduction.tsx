import { Montserrat } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { arabotoBold } from "@/lib/font";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const Introduction = () => {
  return (
    <div className="md:flex md:items-stretch">
      <section className="w-full bg-[#5185FF] flex flex-col gap-6 p-10 items-center">
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
      <section className="w-full bg-[#F8DF71] flex flex-col gap-3 p-10">
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
