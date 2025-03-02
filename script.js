const plants = []
const wishlist = []
// const buyAllPlants = []

// Fetch plants data from the JSON file
async function fetchPlants() {
  try {
    const response = await fetch("plants.json")
    const data = await response.json()
    plants.length = 0
    plants.push(...data)
    syncData()
    renderAdminPlants()
  } catch (error) {
    console.error("Failed to fetch plants data:", error)
  }
}

// Save plants data to a downloadable JSON file
async function savePlants() {
  const dataStr = JSON.stringify(plants, null, 2)
  const blob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "plants.json"
  a.click()
  URL.revokeObjectURL(url)
}

// Add a new plant through the admin panel
function addPlant() {
  const name = document.getElementById("plantName").value
  const price = document.getElementById("plantPrice").value
  const description = document.getElementById("plantDescription").value
  const image = document.getElementById("plantImage").value

  if (name && price) {
    plants.push({ name, price, description, image, count: 0 })
    alert("Plant added successfully!")
    renderAdminPlants()
    savePlants()
  }
}

// Load plants data and wishlist from localStorage
window.onload = () => {
  fetchPlants()
  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  wishlist.push(...storedWishlist.map((item) => ({ ...item, count: item.count ?? 0 })))
  syncData()
}

// Render plant cards on the home page
function renderPlants() {
  const plantList = document.getElementById("plant-list")
  if (plantList) {
    plantList.innerHTML = ""
    plants.forEach((plant, index) => {
      plantList.innerHTML += `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${plant.image}" class="card-img-top" alt="${plant.name}">
                        <div class="card-body">
                            <h5 class="card-title">${plant.name}</h5>
                            <p class="card-text">${plant.description}</p>
                            <p class="card-text"><strong>Price: </strong>${plant.price}</p>
                            <button class="btn btn-outline-primary" onclick="addToWishlist(${index})">Add to Cart</button>
                        </div>
                    </div>
                </div>`
    })
  }
}

// Edit plant details in the admin panel
function editPlant(index) {
  const name = prompt("Edit Name", plants[index].name)
  const price = prompt("Edit Price", plants[index].price)
  const description = prompt("Edit Description", plants[index].description)
  const image = prompt("Edit Image URL", plants[index].image)

  if (name && price) {
    plants[index] = { ...plants[index], name, price, description, image }
    syncData()
    renderAdminPlants()
    alert("Plant updated successfully!")
    savePlants()
  }
}

// Delete a plant from the admin panel
function deletePlant(index) {
  if (confirm("Are you sure you want to delete this plant?")) {
    plants.splice(index, 1)
    syncData()
    renderAdminPlants()
    savePlants()
  }
}

// Sync data with localStorage and re-render UI
function syncData() {
  localStorage.setItem("plants", JSON.stringify(plants))
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  renderPlants()
  renderWishlist()
  updateCountBadge()
}

// Render plants in the admin panel for management
function renderAdminPlants() {
  const adminList = document.getElementById("admin-plant-list")
  if (adminList) {
    adminList.innerHTML = ""
    plants.forEach((plant, index) => {
      adminList.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${plant.name}</h5>
                        <p class="card-text">${plant.description}</p>
                        <p class="card-text"><strong>Price:</strong> ${plant.price}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-warning btn-sm" onclick="editPlant(${index})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deletePlant(${index})">Delete</button>
                        </div>
                    </div>
                </div>`
    })
  }
}

// Wishlist functions (Add, Remove, Sync, Render)
function addToWishlist(index) {
  const plant = plants[index]
  const existing = wishlist.find((item) => item.name === plant.name)
  if (existing) {
    existing.count += 1
  } else {
    wishlist.push({ ...plant, count: 1 })
  }
  syncData()
}

function removeFromWishlist(index) {
  if (wishlist[index].count > 1) {
    wishlist[index].count -= 1
  } else {
    wishlist.splice(index, 1)
  }
  syncData()
}

function renderWishlist() {
  const wishlistEl = document.getElementById("wishlist")
  const totalPriceEl = document.getElementById("total-price")
  if (wishlistEl) {
    wishlistEl.innerHTML = ""
    wishlist.forEach((plant, index) => {
      wishlistEl.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${plant.name}</h5>
                        <p class="card-text"><strong>Price:</strong> ${plant.price}</p>
                        <p class="card-text"><strong>Count:</strong> ${plant.count}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-primary btn-sm" onclick="addToWishlist(${index})">➕</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="removeFromWishlist(${index})">➖</button>
                        </div>
                    </div>
                </div>`
    })
    const totalPrice = wishlist.reduce((sum, item) => sum + item.price * item.count, 0)
    totalPriceEl.innerHTML = `
            <div class="card p-3">
                <h5>Total Price: ${totalPrice}</h5>
                <button class="btn btn-success" onclick="buyAllPlants()">Buy All</button>
            </div>`
  }
}

// // Function to handle buying all plants via WhatsApp
// function buyAllPlants() {
//   const orderDetails = wishlist.map((item) => `${item.name} (${item.count})`).join(", ")
//   const message = `Hello, I want to buy the following plants: ${orderDetails}.`
//   window.location.href = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
// }

// Update cart count badge
function updateCountBadge() {
  const countBadge = document.getElementById("count-badge")
  const totalCount = wishlist.reduce((sum, item) => sum + item.count, 0)
  countBadge.textContent = totalCount > 0 ? totalCount : "0"
}

