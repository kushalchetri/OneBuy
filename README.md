# OneBuy - E-Commerce Module

A complete full-stack e-commerce application built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- Product listing with responsive grid layout
- Shopping cart with add/remove/update quantity
- Real-time total price calculation
- Clean, professional UI with Tailwind CSS
- Auto-seeding database from product images
- RESTful API with validation and error handling

## Project Structure

```
onebuy/
├── backend/          # Node.js + Express + MongoDB
├── frontend/         # React + Vite + Tailwind CSS
└── products/         # Original product images
```

## Setup Instructions

### 1. Configure MongoDB Connection

Edit `backend/.env` and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
```

### 2. Start Backend Server

```bash
cd backend
npm start
```

The server will:
- Connect to MongoDB
- Auto-seed the database with 12 products (if empty)
- Start on port 5000

### 3. Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The React app will start on port 3000.

### 4. Open in Browser

Navigate to: `http://localhost:3000`

## API Endpoints

- `GET /products` - Fetch all products
- `POST /cart` - Add item to cart (with validation)

## Technologies Used

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- Context API for state management

## Product Images

The application includes 12 products across 3 categories:
- Clothes (4 items)
- Electronics (4 items)
- Shoes (4 items)

Images are automatically loaded from `frontend/public/assets/` and seeded into the database on first run.

## Development Notes

- No custom CSS files - Tailwind utilities only
- Functional React components with hooks
- Async/await for all asynchronous operations
- Centralized error handling
- Validation middleware for API requests
