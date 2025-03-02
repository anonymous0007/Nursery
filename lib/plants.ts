import type { Plant } from "@/types"

// Initial plants data
const initialPlants: Plant[] = [
  {
    id: "1",
    name: "Mango",
    price: 12,
    description: "Very Juicy Mango",
    image:
      "https://w7.pngwing.com/pngs/733/28/png-transparent-red-mangoes-juice-smoothie-mango-health-eating-mango-natural-foods-food-orange-thumbnail.png",
  },
  {
    id: "2",
    name: "Jasmine Plant",
    price: 35,
    description: "High Demanding Plant",
    image:
      "https://img.freepik.com/free-psd/winter-jasmine-flower-isolated-transparent-background_191095-29516.jpg?semt=ais_hybrid",
  },
  {
    id: "3",
    name: "Monstera Deliciosa",
    price: 45,
    description: "Popular houseplant with distinctive split leaves",
    image: "https://images.unsplash.com/photo-1637967886160-fd78dc3ce0f5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Snake Plant",
    price: 25,
    description: "Easy to care for plant with tall, stiff leaves",
    image: "https://images.unsplash.com/photo-1599009944997-3544a939813c?q=80&w=1000&auto=format&fit=crop",
  },
]

// Get all plants
export async function getPlants(): Promise<Plant[]> {
  // In a real app, this would fetch from an API
  const storedPlants = localStorage.getItem("plants")

  if (!storedPlants) {
    // Initialize with default plants if none exist
    localStorage.setItem("plants", JSON.stringify(initialPlants))
    return initialPlants
  }

  try {
    return JSON.parse(storedPlants)
  } catch (error) {
    console.error("Failed to parse plants from localStorage:", error)
    return initialPlants
  }
}

// Get a single plant by ID
export async function getPlantById(id: string): Promise<Plant | null> {
  const plants = await getPlants()
  return plants.find((plant) => plant.id === id) || null
}

// Save plants to localStorage
export async function savePlants(plants: Plant[]): Promise<void> {
  localStorage.setItem("plants", JSON.stringify(plants))
}

