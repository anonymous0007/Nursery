// "use client"

// import Link from "next/link"
// import { ShoppingBag, ArrowLeft } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { useCart } from "@/components/cart-provider"
// import { CartItems } from "@/components/cart-items"
// import { SiteHeader } from "@/components/site-header"
// import { SiteFooter } from "@/components/site-footer"

// export default function CartPage() {
//   const { items, totalPrice } = useCart()

//   return (
//     <div className="flex min-h-screen flex-col">
//       <SiteHeader />
//       <main className="flex-1 container py-10">
//         <div className="mx-auto max-w-3xl">
//           <div className="flex items-center justify-between mb-8">
//             <h1 className="text-3xl font-bold">Your Cart</h1>
//             <Link href="/shop">
//               <Button variant="ghost" size="sm">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Continue Shopping
//               </Button>
//             </Link>
//           </div>

//           {items.length > 0 ? (
//             <>
//               <CartItems />
//               <div className="mt-8 space-y-4">
//                 <div className="flex items-center justify-between border-t pt-4">
//                   <span className="text-lg font-medium">Total</span>
//                   <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
//                 </div>
//                 <Button className="w-full" size="lg">
//                   Checkout
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="mb-4 rounded-full bg-muted p-3">
//                 <ShoppingBag className="h-6 w-6" />
//               </div>
//               <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
//               <p className="mb-6 text-muted-foreground">Looks like you haven't added any plants to your cart yet.</p>
//               <Link href="/shop">
//                 <Button>Browse Plants</Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   )
// }







"use client"

import Link from "next/link"
import { ShoppingBag, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { CartItems } from "@/components/cart-items"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CartPage() {
  const { items, totalPrice } = useCart()

  // Function to handle buying all plants via WhatsApp
  const buyAllPlants = () => {
    const orderDetails = items.map((item) => `${item.name} (${item.quantity ?? 1})`).join(", ");
    const message = `Hello, I want to buy the following plants: ${orderDetails}. The total price is ₹${totalPrice.toFixed(2)}.`;
    window.location.href = `https://wa.me/6291912711?text=${encodeURIComponent(message)}`;
};

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <Link href="/shop">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {items.length > 0 ? (
            <>
              <CartItems />
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={buyAllPlants}>
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-3">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">
                Looks like you haven't added any plants to your cart yet.
              </p>
              <Link href="/shop">
                <Button>Browse Plants</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
