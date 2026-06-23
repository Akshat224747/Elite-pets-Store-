# ElitePets 🐾

Premium pet products dropshipping store.

## Tech Stack
- Next.js 14 + React
- Tailwind CSS
- Google Sheets (products + orders)
- Google Forms (order collection)
- Vercel (free hosting)

## Pages
| Page | URL |
|------|-----|
| Homepage | / |
| All Products | /products |
| Product Detail | /products/pet-cooling-mat |
| Product Detail | /products/pet-water-bottle |
| Thank You | /thank-you |
| Admin Login | /admin |
| Admin Dashboard | /admin/dashboard |

## Admin Password
`elitepets2025`
⚠️ Change this in: pages/admin/index.js line 4

## Deploy to Vercel (Mobile Steps)

1. Go to github.com → New repository → Name: `elitepets`
2. Upload all these files (maintain folder structure)
3. Go to vercel.com → New Project → Import your GitHub repo
4. Click Deploy → Done!

## Google Sheets Setup
- Sheet ID is already configured: `1pbYWBQvAdmvThITkFLfmciq-A9a8hF0AyxIz2sz8bvg`
- Sheet1 = Orders (auto-filled by Google Form)
- Sheet2 = Products (managed via Admin Panel)

## Customize Products
Edit: `data/products.js`
- Change prices, descriptions, images, features
- Add more products by adding to the PRODUCTS array
