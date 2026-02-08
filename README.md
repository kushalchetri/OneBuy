OneBuy – Mini E-Commerce Module

OneBuy is a full-stack mini e-commerce application built as a take-home assignment to demonstrate frontend development, backend APIs, and basic Docker usage.

The project includes a product listing, shopping cart functionality, REST APIs, and a fully containerized setup using Docker.

Running the Application with Docker (Recommended)

The entire application is containerized and can be started with a single command.

Prerequisites

Docker

Docker Compose

Steps to Run
docker-compose up --build

Application URLs

Frontend: http://localhost:5173

Backend: http://localhost:5000

Manual Setup (Without Docker)
1. Configure Environment Variables

Create or update backend/.env:

MONGODB_URI=your_mongodb_connection_string_here
PORT=5000

2. Start Backend Server
cd backend
npm install
npm run dev


The backend will:

Connect to MongoDB

Seed the database with products if empty

Run on port 5000

3. Start Frontend Development Server

Open a new terminal:

cd frontend
npm install
npm run dev


The frontend will start on port 5173.

Features

Product listing page with responsive layout

Product cards with image, name, price, and add-to-cart

Cart page with quantity update and item removal

Real-time total price calculation

RESTful APIs with validation and error handling

Database auto-seeding on first run

API Endpoints

GET /products – Fetch all products

POST /cart – Add item to cart (with validation)

Project Structure
onebuy/
├── backend/          # Node.js + Express + MongoDB
├── frontend/         # React + Vite + Tailwind CSS
├── products/         # Product images used for seeding
└── docker-compose.yml

Technologies Used
Frontend

React 18

Vite

Tailwind CSS

Axios

Context API for state management

Backend

Node.js

Express.js

MongoDB with Mongoose

dotenv

Validation middleware

DevOps

Docker

Docker Compose

Development Notes

Functional React components with hooks only

No external UI libraries used

Clean folder structure

Centralized error handling in backend

Environment variables managed using .env

Application runs using docker-compose up --build