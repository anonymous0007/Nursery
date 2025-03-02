"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export function CartItems() {
  const { items, updateItemQuantity, removeItem } = useCart()

  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 py-4 border-b">
          <div className="relative aspect-square h-24 w-24 min-w-24 overflow-hidden rounded-md bg-muted">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" sizes="96px" />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="grid gap-1">
              <Link href={`/shop/${item.id}`} className="font-medium hover:underline">
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

