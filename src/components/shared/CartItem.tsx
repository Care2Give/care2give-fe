import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Button } from "../ui/button";
import { DollarSign, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

interface Props
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  title?: string;
  image?: string;
  description?: string;
  price?: number;
  onDelete?: () => void;
}

export const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

const CartItem: React.FC<Props> = ({
  title = "Title",
  image = "",
  description = "Description",
  price = 0,
  onDelete = () => {},
  id,
  className,
  ...props
}) => {
  return (
    <div
      className={`flex justify-between items-center w-full p-4 border rounded-[16px] [&:has(button[data-state="checked"])]:[--cart-bg-color: #5185FF] [&:has(button[data-state="checked"])]:bg-[#5185FF] [&:has(button[data-state="checked"])]:text-white`}
    >
      <Checkbox
        id={id}
        className={cn("peer h-5 w-5 self-center", className)}
        {...props}
      />
      <label
        htmlFor={id}
        className="relative rounded h-[7rem] w-[7rem] mx-4 cursor-pointer"
      >
        <Image
          className="rounded-[8px] object-cover object-center"
          src={image}
          alt="campaign cover image"
          fill={true}
        />
      </label>
      <label
        htmlFor={id}
        className="self-stretch flex flex-1 min-w-0 flex-col justify-between gap-2 cursor-pointer peer-[[data-state='checked']]:[&>div>div]:bg-[#5185FF] peer-[[data-state='checked']]:[&>div]:bg-none peer-[[data-state='checked']]:[&>div]:bg-[#43D7AE]"
      >
        <h3 className="text-lg truncate leading-none font-semibold mt-1">
          {title}
        </h3>
        <p
          className={`text-xs font-mont text-muted-foreground ${montserrat.className}`}
        >
          {description}
        </p>
        <div
          className={`rounded-[12px] h-9 bg-gradient-to-r from-[#4ED2C2] via-[#5185ff] to-[#6164cf] p-0.5 w-fit ${montserrat.className} text-sm`}
        >
          <div className="rounded-[10px] bg-white h-full px-3 py-1 flex justify-center gap-1 items-center">
            <span className="font-semibold">$</span> {price.toLocaleString()}
          </div>
        </div>
      </label>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={"text-[#5185FF] peer-[[data-state='checked']]:text-white"}
      >
        <Trash2 className="h-6 w-6" strokeWidth={2} />
      </Button>
    </div>
  );
};

export default CartItem;
