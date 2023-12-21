import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import { EyeOpenIcon } from "@radix-ui/react-icons";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col gap-12 p-10 bg-blue-500">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2 min-w-32">
            <EyeOpenIcon width={80} height={80} color="white" />
            <p
              className={`text-white text-2xl text-center ${arabotoBold.className}`}
            >
              Our Vision
            </p>
          </div>
          <p className={`text-white text-base ${montserrat.className}`}>
            To reach out to all caregivers of persons with mental health issues
            in Singapore and empower them to achieve a high level of well-being
            and resilience. To train and support 20,000 caregivers by 2023.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <p className={`text-white text-base ${montserrat.className}`}>
            To meet the needs of families and caregivers of persons with mental
            health issues through education, support networks, crisis reports,
            tailored services, and self-care enablement.
          </p>
          <div className="flex flex-col items-center gap-2 min-w-32">
            <Image
              src="/footer/hand-heartshake.svg"
              width={80}
              height={80}
              alt="Our Mission"
            />
            <p className={`text-white text-xl ${arabotoBold.className}`}>
              Our Mission
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
