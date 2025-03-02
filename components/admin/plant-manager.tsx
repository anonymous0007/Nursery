"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Plant } from "@/types"
import { getPlants, savePlants } from "@/lib/plants"

export function PlantManager() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPlant, setCurrentPlant] = useState<Plant | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
    })
  }

  const handleAddPlant = async () => {
    try {
      const newPlant: Plant = {
        id: crypto.randomUUID(),
        name: formData.name,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        image: formData.image || "/placeholder.svg?height=400&width=400",
      }

      const updatedPlants = [...plants, newPlant]
      await savePlants(updatedPlants)
      setPlants(updatedPlants)
      resetForm()
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Failed to add plant:", error)
    }
  }

  const handleEditClick = (plant: Plant) => {
    setCurrentPlant(plant)
    setFormData({
      name: plant.name,
      price: plant.price.toString(),
      description: plant.description,
      image: plant.image,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdatePlant = async () => {
    if (!currentPlant) return

    try {
      const updatedPlant: Plant = {
        ...currentPlant,
        name: formData.name,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
      }

      const updatedPlants = plants.map((p) => (p.id === currentPlant.id ? updatedPlant : p))

      await savePlants(updatedPlants)
      setPlants(updatedPlants)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Failed to update plant:", error)
    }
  }

  const handleDeletePlant = async (id: string) => {
    try {
      const updatedPlants = plants.filter((p) => p.id !== id)
      await savePlants(updatedPlants)
      setPlants(updatedPlants)
    } catch (error) {
      console.error("Failed to delete plant:", error)
    }
  }

  if (loading) {
    return <div>Loading plants...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Plants ({plants.length})</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Plant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Plant</DialogTitle>
              <DialogDescription>Add a new plant to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Plant name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="price">Price</label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="29.99"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Plant description"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="image">Image URL</label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPlant}>Add Plant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => (
          <Card key={plant.id}>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={plant.image || "/placeholder.svg"}
                  alt={plant.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{plant.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{plant.description}</p>
                <p className="font-medium mt-2">${plant.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditClick(plant)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="flex-1">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the plant from your inventory.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePlant(plant.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Plant</DialogTitle>
            <DialogDescription>Update the plant details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name">Name</label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-price">Price</label>
              <Input id="edit-price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-description">Description</label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-image">Image URL</label>
              <Input id="edit-image" name="image" value={formData.image} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePlant}>Update Plant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

