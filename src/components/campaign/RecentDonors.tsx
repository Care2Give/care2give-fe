import { Montserrat } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
});

const RecentDonors = () => {
  return (
    <div className="w-full px-10 py-6">
      <h3 className={"text-lg font-bold mb-3"}>Recent Donors</h3>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(50px,_1fr))] gap-5">
        {[0, 1, 2].map((donor) => (
          <Avatar key={donor} className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
        {[3, 4].map((donor) => (
          <Avatar key={donor} className="h-12 w-12">
            <AvatarImage src="/campaign/person.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
        {[5].map((donor) => (
          <Avatar
            key={donor}
            className={`${montserrat.className} h-12 w-12 text-sm font-semibold`}
          >
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#F8DF71]">300+</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
};

export default RecentDonors;
