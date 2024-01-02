import NavBar from "@/components/navbar";
import Cart from "@/components/gift_basket/Cart";
import React from "react";

const CheckoutPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar title="Gift Basket" />
            <div className="overflow-hidden w-screen px-2 mb-6">
                <Cart />
            </div>
        </main>
    )
}

export default CheckoutPage;
