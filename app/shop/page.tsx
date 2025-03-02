import { Suspense } from "react"

import { PlantList } from "@/components/plant-list"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-6">Shop Plants</h1>
        <Suspense fallback={<div>Loading plants...</div>}>
          <PlantList />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

