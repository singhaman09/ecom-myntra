```
src/
├── assets/                # Images, icons, banners
├── components/            # Reusable UI components
│   ├── ui/                # Generic UI components like Button, Input, Modal
│   └── shared/            # Shared layout parts like Header, Footer, Navbar
├── features/              # Feature-based modules with their own logic & pages
│   ├── auth/              # Login, Register, authentication logic
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── authAPI.ts     # Authentication-related API functions
│   │   └── index.ts       # Barrel file (for exports)
│   ├── home/              # Homepage logic and UI
│   │   ├── components/
│   │   └── pages/
│   │       └── Home.tsx
│   ├── product/           # Product list and detail views
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductFilterSidebar.tsx
│   │   ├── pages/
│   │   │   ├── ProductList.tsx
│   │   │   └── ProductDetail.tsx
│   │   ├── productAPI.ts  # Product-related API calls
│   │   └── productSlice.ts# Zustand or context state (if needed)
│   ├── cart/              # Cart logic and pages (TBD)
│   ├── checkout/          # Checkout and payment flow (TBD)
│   ├── user/              # User profile, order history, wishlist (TBD)
│   └── admin/             # Admin dashboard, CRUD operations (TBD)
├── hooks/                 # Custom React hooks
├── layouts/               # Layout wrappers (AdminLayout, UserLayout)
├── routes/                # App route configurations
│   └── AppRoutes.tsx
├── services/              # Common services like Axios instance
│   └── apiClient.ts
├── store/                 # Global state (Zustand or Context API)
├── types/                 # Global TypeScript types and interfaces
├── utils/                 # Helper functions (e.g., formatPrice, validators)
├── App.tsx                # Root app component
└── main.tsx               # Main entry point (Vite)

```



Folder Guidelines
Modular Feature Design: Every major functionality (auth, product, etc.) is grouped in its own folder under features/ with components, pages, and logic inside.

Reusability: Shared or generic UI components live in components/ui/ and components/shared/.

Scalability: Easily extendable for new features like reviews, notifications, etc.

Separation of Concerns: APIs live under services/ or within each feature, keeping UI and business logic separate.