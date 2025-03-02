"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Plant } from "@/types"
import { getPlantById } from "@/lib/plants"

export default function PlantDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        if (typeof params.id !== "string") {
          router.push("/shop")
          return
        }

        const plantData = await getPlantById(params.id)
        if (!plantData) {
          router.push("/shop")
          return
        }

        setPlant(plantData)
      } catch (error) {
        console.error("Failed to fetch plant:", error)
        router.push("/shop")
      } finally {
        setLoading(false)
      }
    }

    fetchPlant()
  }, [params.id, router])

  const handleAddToCart = () => {
    if (plant) {
      addItem(plant, quantity)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-10">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-muted rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-8 w-2/3 bg-muted rounded"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-2/3 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!plant) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <Link href="/shop" className="inline-flex items-center text-sm font-medium mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={plant.image || "/placeholder.svg"}
              alt={plant.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{plant.name}</h1>
              <p className="text-2xl font-semibold mt-2">${plant.price}</p>
            </div>

            <div className="prose max-w-none">
              <p>{plant.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-lg font-medium w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="w-full" size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

