"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import type { Plant } from "@/types"
import { getPlants } from "@/lib/plants"

export function PlantList() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsData = await getPlants()
        setPlants(plantsData)
      } catch (error) {
        console.error("Failed to fetch plants:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlants()
  }, [])

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square w-full bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="h-9 w-full bg-muted rounded animate-pulse" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (plants.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-muted-foreground">No plants available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {plants.map((plant) => (
        <Card key={plant.id} className="overflow-hidden">
          <Link href={`/shop/${plant.id}`} className="relative aspect-square block overflow-hidden">
            <Image
              src={plant.image || "/placeholder.svg"}
              alt={plant.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>
          <CardContent className="p-4">
            <div className="space-y-1">
              <Link href={`/shop/${plant.id}`} className="font-medium hover:underline">
                {plant.name}
              </Link>
              <p className="text-sm font-medium text-primary">${plant.price}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" size="sm" onClick={() => addItem(plant, 1)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

