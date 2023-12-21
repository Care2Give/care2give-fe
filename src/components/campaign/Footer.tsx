import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

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
    <footer className="flex flex-col gap-4 p-10 bg-blue-500 text-white">
      <h4 className={`${arabotoBold.className} text-2xl`}>About the Charity</h4>
      <p className={`${montserrat.className} text-sm`}>
        Caregivers Alliance Limited (CAL) is a professional non-profit
        organisation in Singapore dedicated to meeting the needs of caregivers
        of persons with mental health issues and dementia through education,
        support networks, crisis support, tailored services and self-care
        enablement. While there are other organisations providing support to the
        community affected by mental health issues, only CAL focuses exclusively
        on supporting caregivers with professional services.
      </p>
      <p className={`${montserrat.className} text-sm`}>
        CAL was incorporated on 25 October 2011. Our founding members are
        Singapore Anglican Community Services, Caregivers&apos; Association of
        the Mentally Ill and BinjaiTree Limited.
      </p>
      <p className={`${montserrat.className} text-sm`}>
        CAL is an approved Institution of a Public Character (IPC), which
        reflects that it is exclusively non-profit in nature. In 2019, CAL won
        the Charity Governance Award 2019 (medium charities category), awarded
        by the Charity Council in recognition of it having adopted the highest
        standards of governance, in line with the Code of Governance for
        Charities & IPCs.
      </p>
    </footer>
  );
};

export default Footer;
