import NavBar from "@/components/navbar";
import CartItem from "@/components/shared/CartItem";
import Introduction from "@/components/home/Introduction";
import Featured from "@/components/home/Featured";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <NavBar title="Caregivers Alliance Limited" titleIsCenterAligned />
      <main className="flex min-h-screen flex-col items-center justify-between pt-[72px]">
        <Introduction />
        <Featured />
        <Footer />

        {/* <CartItem
        id="Campaign-1"
        title="Charity Dinner 2023"
        image="/campaign-img.png"
        defaultChecked={true}
        description="Support us by buying a Silver table for 10 guests"
        price={8000}
      />
      <CartItem
        id="Campaign-2"
        title="Charity Dinner 2023"
        image="/campaign-img.png"
        description="Support us by buying a Silver table for 10 guests"
        price={10000}
      /> */}
      </main>
    </>
  );
}
