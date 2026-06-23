export const PRODUCTS = [
  {
    id: 'pet-cooling-mat',
    name: 'Pet Cooling Mat',
    price: 24.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    badge: 'Best Seller',
    badgeColor: '#f59e0b',
    shortDesc: 'Keep your pet cool & comfortable all summer long',
    description: `Is your dog or cat suffering in the summer heat? Our premium self-cooling gel mat provides instant relief without electricity or refrigeration.

The pressure-activated cooling gel activates the moment your pet lies down, absorbing body heat and keeping them comfortable for up to 3 hours at a stretch. Simply leave it flat for 15–20 minutes to recharge.

Perfect for crates, floors, kennels, sofas, and car seats. Non-toxic, bite-resistant, and easy to clean with a damp cloth.`,
    features: [
      '🧊 Self-cooling gel — no electricity needed',
      '⏱️ Stays cool for up to 3 hours',
      '🐾 Non-toxic, pet-safe materials',
      '🧼 Wipe-clean, waterproof surface',
      '📐 Available in multiple sizes',
      '🚗 Great for home, crate & car travel',
    ],
    sizes: ['Small (20"×16")', 'Medium (27"×20")', 'Large (35"×27")', 'X-Large (43"×35")'],
    shipping: 'Free shipping · Arrives in 5–8 business days',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeQPAxefepF_KW1-HBq3pfHtEW_OFheTaz6KnKKYe5Pc3rZwg/viewform',
  },
  {
    id: 'pet-water-bottle',
    name: 'Pet Water Bottle',
    price: 19.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    badge: 'New Arrival',
    badgeColor: '#10b981',
    shortDesc: 'Hydrate your pet anywhere, anytime — leak-proof & easy',
    description: `Walks, hikes, road trips — your pet gets thirsty too. Our 2-in-1 travel water bottle with built-in bowl means you'll never have to guess when they last drank.

One press fills the integrated trough. Release and the water flows back in — zero waste, zero mess. Made from BPA-free food-grade materials safe for daily use.

Lightweight enough to clip onto any bag. Your dog will thank you.`,
    features: [
      '💧 One-press drinking trough design',
      '♻️ Leak-proof — water returns to bottle',
      '🧪 BPA-free, food-grade safe materials',
      '🎒 Carabiner clip included',
      '🌡️ Works with hot or cold water',
      '✈️ TSA-friendly for travel',
    ],
    sizes: ['12 oz (350ml)', '18 oz (550ml)', '24 oz (750ml)'],
    shipping: 'Free shipping · Arrives in 5–8 business days',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeQPAxefepF_KW1-HBq3pfHtEW_OFheTaz6KnKKYe5Pc3rZwg/viewform',
  },
]

export function getProduct(id) {
  return PRODUCTS.find(p => p.id === id) || null
}
