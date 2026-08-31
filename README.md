# 💼 TrackMe — Modern MERN Personal Finance & Expense Tracker

[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**TrackMe** is a full-stack MERN (MongoDB, Express.js, React, Node.js) personal finance application built to help users seamlessly monitor daily expenses, track diverse income streams, visualize spending patterns through interactive charts, set savings milestones, and export financial reports.

---

## ✨ Core Features

### 🔐 1. Secure Authentication & User Profiles
- **JWT-Based Authentication**: Secure registration and login flows with token storage and automatic request interceptors.
- **Password Security**: Automatic password hashing via `bcryptjs` with salt rounds.
- **Profile Management**: Update full name, email, avatar photo upload (Multer), and change passwords with instant UI reflection.

### 📊 2. Dynamic Financial Dashboard
- **Real-Time Net Balance**: Instant computation of `Total Income - Total Expenses` with Surplus/Deficit status.
- **Interactive Analytics**:
  - **Dual-Bar Time-Series Chart** comparing income earnings and daily spendings.
  - **Category Donut Chart** visualizing spending distribution percentages across categories (Food, Rent, Transport, etc.).
- **Savings Milestone Tracker**: Customizable monthly savings targets with progress bars and dynamic badges.
- **Recent Transactions Feed**: Unified chronological stream of recent income and expense records.

### 💰 3. Income Streams & Expense Management
- **Interactive Modals**: Add income/expense entries with custom emoji icon pickers, amounts, and dates.
- **Quick Category Tags**: 1-click categorization (🍔 Food, 🏠 Rent, 🚗 Transport, 🛒 Groceries, ⚡ Utilities, 🎬 Entertainment, 🏥 Health).
- **Search & Sort**: Real-time search keyword filtering and sorting (Latest, Oldest, Highest Amount, Lowest Amount).
- **CSV Data Export**: 1-click export of income and expense reports for offline analysis in Excel/Sheets.
- **Safe Record Deletion**: Confirmation dialogs preventing accidental deletions.

### 🎨 4. Modern UI & Responsive Layout
- **Modern Split-Screen Auth Layout**: Branded hero banner with glassmorphism preview cards.
- **Responsive Navigation**: Sticky top navigation bar and collapsible mobile sidebar drawer.
- **Toast Notifications**: Built-in visual alerts for all user actions (`react-hot-toast`).

---

## 🛠️ Tech Stack & Architecture

```
TrackMe/
├── backend/                  # Express.js REST API & MongoDB models
│   ├── config/               # Database connection (db.js)
│   ├── controllers/          # Business logic (auth, income, expense, dashboard)
│   ├── middleware/           # JWT protect & Multer file upload
│   ├── models/               # Mongoose Schemas (User, Income, Expense)
│   ├── routes/               # Express API Routes
│   ├── uploads/              # Stored profile avatars
│   └── server.js             # Entry point
└── frontend/                 # React 19 Client with Vite & Tailwind CSS
    ├── src/
    │   ├── components/       # Reusable UI (Inputs, Cards, Charts, Modals, Layouts)
    │   ├── context/          # Global UserContext & auth state
    │   ├── pages/            # Auth (Login, SignUp) & Dashboard (Home, Income, Expense)
    │   └── utils/            # Axios instance, helpers, and API endpoints
    └── vite.config.js        # Vite configuration
```

---

## 📡 API Endpoints Reference

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Register new user account |
| `POST` | `/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/getUser` | Private | Get authenticated user profile |
| `PUT` | `/update-profile` | Private | Update name, email, or avatar |
| `PUT` | `/change-password`| Private | Change account password |
| `POST` | `/upload-image` | Public/Private | Upload profile avatar photo |

### Income (`/api/v1/income`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/add` | Private | Add new income record |
| `GET` | `/get` | Private | Retrieve all income entries |
| `DELETE` | `/:id` | Private | Delete specific income record |
| `GET` | `/downloadexcel` | Private | Download income CSV spreadsheet |

### Expense (`/api/v1/expense`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/add` | Private | Add new expense record |
| `GET` | `/get` | Private | Retrieve all expense entries |
| `DELETE` | `/:id` | Private | Delete specific expense record |
| `GET` | `/downloadexcel` | Private | Download expense CSV spreadsheet |

### Dashboard Analytics (`/api/v1/dashboard`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Private | Aggregated stats, 30-day series, and category totals |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or MongoDB Atlas cluster)

### 1. Clone & Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/trackme
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
```

Start the Backend Server:
```bash
npm run dev
# Server will run on http://localhost:8000
```

### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
# Frontend will run on http://localhost:5173 (or 5174)
```

---

## 🔑 Demo Account
For instant testing or client demos:
- **Email**: `admin@trackme.com`
- **Password**: `adminPassword123`

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
