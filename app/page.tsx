import { Suspense } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PlantList } from "@/components/plant-list"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Radha Krishna Nursery
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover our collection of beautiful plants for your home and garden
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/shop">
                  <Button size="lg">Browse Plants</Button>
                </Link>
                <Link href="/cart">
                  <Button size="lg" variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Featured Plants</h2>
            <p className="text-muted-foreground">Check out our selection of premium plants for your collection</p>
          </div>
          <Suspense fallback={<div className="mt-8 grid gap-6">Loading plants...</div>}>
            <PlantList />
          </Suspense>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

