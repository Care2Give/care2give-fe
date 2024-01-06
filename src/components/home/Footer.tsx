import { Montserrat } from "next/font/google";
import Image from "next/image";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { arabotoBold } from "@/lib/font";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const Footer = () => {
  return (
    <footer className="flex flex-col w-full gap-10 md:gap-4 p-10 bg-gradient-to-b from-[#4ED2C2] via-[#5185ff] to-[#6164cf] text-white">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-col items-center gap-2 md:min-w-32">
          <EyeOpenIcon width={80} height={80} color="white" />
          <p
            className={`text-white text-2xl md:text-xl text-center ${arabotoBold.className}`}
          >
            Our Vision
          </p>
        </div>
        <p
          className={`text-white text-base text-center md:text-left ${montserrat.className}`}
        >
          To reach out to all caregivers of persons with mental health issues in
          Singapore and empower them to achieve a high level of well-being and
          resilience. To train and support 20,000 caregivers by 2023.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-col items-center gap-2 md:min-w-32">
          <Image
            src="/footer/hand-heartshake.svg"
            width={80}
            height={80}
            alt="Our Mission"
          />
          <p
            className={`text-white text-2xl md:text-xl text-center ${arabotoBold.className}`}
          >
            Our Mission
          </p>
        </div>
        <p
          className={`text-white text-base text-center md:text-left ${montserrat.className}`}
        >
          To meet the needs of families and caregivers of persons with mental
          health issues through education, support networks, crisis reports,
          tailored services, and self-care enablement.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
