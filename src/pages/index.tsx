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
      </main>
    </>
  );
}
