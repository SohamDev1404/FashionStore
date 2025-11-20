# H&M Fashion Store Clone

Modern fashion e-commerce experience built with **Next.js 16**, **React 19**, **Redux Toolkit**, and **Tailwind CSS**.  
The UI mirrors H&M’s design language: clean typography, large product imagery, and polished micro-interactions.

![Hero Banner](public/placeholder.jpg)

Live Demo → [https://fashion-store1.vercel.app/](https://fashion-store1.vercel.app/)

---

## ✨ Features

- **Hero experience** with auto-rotating lifestyle imagery.
- **Product catalogue** with search, category filters, sorting, wishlist, and adaptive grid.
- **Responsive product cards** that handle pricing, stock status, hover animations, and cart actions.
- **Global cart** sidebar + dedicated cart page with Myntra-style UX and deterministic pricing.
- **Wishlist** page with add/remove actions and ability to move items to cart.
- **Product detail** pages with zoom-safe galleries, color/size selectors, ratings, and shipping info.
- **Checkout flow** with form validation and order summary.
- Powered by **Fake Store API** via a Redux-powered caching layer.

---

## 🧱 Tech Stack

| Layer             | Details                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, Server Components, Route Handlers)                 |
| UI                | React 19, Tailwind CSS, Radix UI, Lucide Icons                             |
| State Management  | Redux Toolkit + React Redux hooks                                          |
| Data Fetching     | Axios wrapper hitting Fake Store API                                       |
| Forms             | React Hook Form + Zod resolvers                                            |
| Styling           | Tailwind tokens + custom utility classes                                   |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm / npm

### Installation
```bash
git clone https://github.com/SohamDev1404/FashionStore.git
cd FashionStore
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run start
```

---

## 🗂️ Project Structure

```
app/              # Next.js app directory
  page.tsx        # Home (listing)
  cart/           # Cart page
  checkout/       # Checkout flow
  product/[id]/   # Dynamic product detail
components/       # UI + feature components
lib/              # API client + Redux store + slices
public/           # Static assets
```

---

## 📝 Scripts

| Script       | Description          |
| ------------ | -------------------- |
| `npm run dev`   | Start dev server with hot reload |
| `npm run build` | Compile production build         |
| `npm run start` | Serve production build           |
| `npm run lint`  | Run ESLint across the project    |

---

## 📸 Screens

- **Home:** hero banner, filters, product grid, wishlist/cart actions.
- **Cart:** Myntra-style review order + summary card.
- **Wishlist:** saved items with move-to-cart.
- **Product Detail:** enlarged imagery + selectors.
- **Checkout:** shipping form + order summary.

---

## 🙌 Credits

- [Fake Store API](https://fakestoreapi.com/) for sample catalogue data.
- [Radix UI](https://www.radix-ui.com/) & [Lucide](https://lucide.dev/) for accessible primitives/icons.

---

## 📄 License

MIT © 2025 Soham Dev. Use freely, customize for your own fashion storefront, and have fun building!