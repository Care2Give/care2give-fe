import useCartStore, { CartItem } from "@/stores/useCartStore";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

const GiftBasketCartItem = ({
  cartItem,
  removeItem,
  toggleItem,
}: {
  cartItem: CartItem;
  removeItem: (item: CartItem) => void;
  toggleItem: (item: CartItem) => void;
}) => {
  return (
    <div
      className="flex flex-row gap-2 items-center px-5 py-2 rounded-xl font-extralight h-28"
      style={{
        backgroundColor: cartItem.isSelected ? "#5185FF" : "white",
        color: cartItem.isSelected ? "white" : "black",
      }}
    >
      <Checkbox
        checked={cartItem.isSelected}
        onCheckedChange={() => toggleItem(cartItem)}
      />
      <Image
        src={cartItem.campaign.imageUrls[0]}
        alt="campaign_image"
        width={90}
        height={90}
        className="rounded"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-[13px] font-semibold">{cartItem.campaign.title}</h3>
        <p
          className="text-[9px]"
          style={{
            maxWidth: "100%",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cartItem.campaign.description}
        </p>
        <div className="flex">
          <div
            className={`rounded-md p-0.5 w-16 ${
              cartItem.isSelected
                ? "bg-[#43D7AE]"
                : "bg-gradient-to-b from-[#4ED2C2] via-[#5185FF] to-[#6164CF]"
            }`}
          >
            <p
              className={`px-2 py-0.5 text-[11px] flex flex-row gap-1 rounded ${
                cartItem.isSelected ? "bg-[#5185FF]" : "bg-white"
              }`}
            >
              <span className="font-semibold">$</span>
              {cartItem.donationAmount}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          color: cartItem.isSelected ? "white" : "#5185FF",
        }}
      >
        <TrashIcon
          onClick={() => removeItem(cartItem)}
          width="25"
          height="25"
        />
      </div>
    </div>
  );
};

const Cart = () => {
  const { items, removeItem, toggleItem } = useCartStore();
  const [totalAmount, setTotalAmount] = useState<number>(-1);

  useEffect(() => {
    setTotalAmount(
      items
        .filter((i) => i.isSelected)
        .reduce((acc, c) => acc + c.donationAmount, 0)
    );
  }, [items]);

  return (
    <div className="mt-20">
      {totalAmount !== -1 && (
        <div className="flex flex-col gap-2">
          {items.map((i, idx) => (
            <GiftBasketCartItem
              key={idx}
              cartItem={i}
              removeItem={removeItem}
              toggleItem={toggleItem}
            />
          ))}
        </div>
      )}
      <div className="px-4">
        <hr className="my-4" />
        <div className="flex flex-row">
          <p className="text-lg">Total</p>
          <p className="ml-auto font-bold text-xl">${totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
