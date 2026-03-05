const homes = [
  {
    id: 1,
    title: "Sunny 2BHK in Indiranagar",
    city: "Bengaluru",
    type: "Apartment",
    beds: 2,
    baths: 2,
    price: 32000,
    availableFrom: "2026-03-15",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Family Villa Near Cyber City",
    city: "Gurugram",
    type: "Villa",
    beds: 4,
    baths: 3,
    price: 78000,
    availableFrom: "2026-04-01",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Compact 1RK for Working Professionals",
    city: "Pune",
    type: "Studio",
    beds: 1,
    baths: 1,
    price: 15000,
    availableFrom: "2026-03-10",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Sea-facing Premium Apartment",
    city: "Mumbai",
    type: "Apartment",
    beds: 3,
    baths: 3,
    price: 95000,
    availableFrom: "2026-05-01",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Budget 2BHK Near Metro",
    city: "Noida",
    type: "Apartment",
    beds: 2,
    baths: 2,
    price: 27000,
    availableFrom: "2026-03-20",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
]

const queryInput = document.getElementById("query")
const maxPriceInput = document.getElementById("maxPrice")
const minBedsInput = document.getElementById("minBeds")
const listingGrid = document.getElementById("listingGrid")
const countText = document.getElementById("countText")
const priceValue = document.getElementById("priceValue")

const formatINR = (price) => `Rs. ${price.toLocaleString("en-IN")}`

const render = () => {
  const query = queryInput.value.trim().toLowerCase()
  const maxPrice = Number(maxPriceInput.value)
  const minBeds = Number(minBedsInput.value)

  priceValue.textContent = formatINR(maxPrice)

  const filtered = homes.filter((home) => {
    const searchable = `${home.title} ${home.city} ${home.type}`.toLowerCase()
    return searchable.includes(query) && home.price <= maxPrice && home.beds >= minBeds
  })

  countText.textContent = `${filtered.length} homes found`

  listingGrid.innerHTML = filtered
    .map(
      (home) => `
      <article class="card">
        <img src="${home.image}" alt="${home.title}" />
        <div class="card-body">
          <h2>${home.title}</h2>
          <p class="muted">${home.city}</p>
          <p class="muted">${home.beds} bed • ${home.baths} bath • ${home.type}</p>
          <p class="muted">Available from ${home.availableFrom}</p>
          <p class="price">${formatINR(home.price)}/month</p>
        </div>
      </article>
    `
    )
    .join("")

  if (filtered.length === 0) {
    listingGrid.innerHTML = '<p class="muted">No homes match your filters.</p>'
  }
}

queryInput.addEventListener("input", render)
maxPriceInput.addEventListener("input", render)
minBedsInput.addEventListener("change", render)

render()
