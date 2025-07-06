# 🛒 CocoFields Frontend (React.js)

This is the frontend repository for a full-stack e-commerce application, built using **React.js**. It provides a user-friendly interface for browsing products, managing a shopping cart, checking out, viewing order history, and managing user profiles.

---

## ✨ Features

- **Product Browsing**: View a list of products with details like name, price, and description.
- **Product Details**: Dedicated page for each product showing comprehensive information.
- **Shopping Cart**:
  - Add, remove, and update quantities of items in the cart.
  - Cart items persist across page refreshes using `localStorage`.
- **User Authentication**: Secure registration, login, and logout using JWT (stored in HTTP-only cookies).
- **Protected Routes**: Pages like *Checkout*, *Profile*, and *Order History* are only accessible to logged-in users.
- **User Profile Management**: View and update personal information (name, phone, age, gender).
- **Order History**: View a list of previous orders with details and status.
- **Checkout Process**: Simple order placement flow.
- **Contact Us Page**: Users can submit messages with form persistence using `localStorage`.
- **Responsive Design**: Built with Tailwind CSS for a mobile-first experience.
- **Global State Management**: Cart and user session handled via Redux Toolkit.

---

## 💻 Technologies Used (Frontend)

- **React.js** – UI library
- **Redux Toolkit** – Simplified global state management
- **react-redux** – React bindings for Redux
- **React Router DOM** – SPA routing
- **Axios** – HTTP client for API calls
- **Tailwind CSS** – Utility-first CSS framework
- **localStorage** – Used for cart persistence and form data

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS)
- npm
- A running backend (Node.js/Express) at `http://localhost:7777`

### Installation

```bash
git clone <your-frontend-repo-url>
cd <your-frontend-project-folder>
npm install
Start the Development Server
bash
Copy
Edit
npm start
Visit the app at: http://localhost:3000

👨‍💻 Usage
/ – Home page

/products – Browse all products

/product/:id – View product details

/cart – Manage your selected items

/login – User login

/register – User registration

/checkout – Place an order (requires login)

/orders-history – View past orders (requires login)

/profile – Manage your account (requires login)

/contact – Contact form

📌 Pending Features
🔧 Admin Dashboard – Admin panel for managing users/products/orders.

🔄 Product Management – Admin can create, update, delete products.

👤 User Management – Admin can view/edit/add users.

⏳ Automatic Cart Expiry –

Logic to clear cart items that stay in localStorage beyond a configured duration (e.g. 7 days).

Backend Redis-based cart auto-expiry (if applicable) for logged-in users.