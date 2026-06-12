# 🏠 HouseRental – House Rent Application

HouseRental is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that connects property owners with tenants looking for rental properties. The platform allows users to browse rental listings, view property details, submit booking requests, and manage rental properties efficiently.

---

## 🚀 Features

### 👤 User Authentication
- User Registration & Login
- Secure Authentication
- Role-Based Access Control

### 🏘️ Property Management
- Add New Properties
- Update Property Details
- Delete Property Listings
- View Available Properties
- Property Status Management (Available/Booked)

### 🔍 Advanced Property Search
- Search by Location
- Filter by Price Range
- Property Type Filtering
- Amenities-Based Search
- Saved Searches

### 📅 Booking System
- Submit Booking Requests
- Track Booking Status
- Booking History Management
- Owner Approval/Rejection System

### 💬 Owner Contact System
- View Owner Details
- Contact Property Owners
- Direct Communication Between Tenant and Owner

### 👨‍💼 Admin Panel
- Manage Users
- Approve Owner Requests
- Monitor Property Listings
- Platform Management & Security

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS / Bootstrap / Tailwind (depending on your implementation)

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose ODM

### Authentication
- JWT (JSON Web Token)
- Bcrypt Password Hashing

---

## 📂 Project Structure

```bash
HouseHunt/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── screenshots/
├── README.md
└── package.json
```

---

## 🏗️ System Architecture

The application follows a Client-Server Architecture:

### Frontend (React.js)
- Handles UI and User Interactions
- Displays Property Listings
- Sends API Requests to Backend

### Backend (Node.js + Express.js)
- Processes Business Logic
- Handles Authentication
- Manages Property & Booking APIs

### Database (MongoDB)
Stores:
- User Data
- Property Listings
- Booking Records
- Administrative Data

---

## 👥 User Roles

### Tenant
- Register/Login
- Search Properties
- View Property Details
- Contact Owners
- Submit Booking Requests
- Track Booking Status

### Owner
- Add Properties
- Update Property Listings
- Delete Properties
- Manage Booking Requests
- Update Property Availability

### Admin
- Approve Owner Requests
- Manage Users
- Monitor Platform Activities
- Maintain System Security

---

## 🗄️ Database Entities

### User
```js
{
  name,
  email,
  phone,
  password,
  userType,
  profileImage,
  currentLocation
}
```

### Property
```js
{
  ownerId,
  title,
  description,
  location,
  rentAmount,
  propertyType,
  furnishingStatus,
  amenities,
  images,
  status
}
```

### Booking
```js
{
  propertyId,
  tenantId,
  startDate,
  endDate,
  bookingDate,
  status
}
```

---

## 🔄 API Endpoints (Example)

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

### Properties
```http
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PUT    /api/properties/:id
DELETE /api/properties/:id
```

### Bookings
```http
POST /api/bookings
GET  /api/bookings
PUT  /api/bookings/:id
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/househunt.git
cd househunt
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
cd server
npm start
```

### Run Frontend

```bash
cd client
npm start
```
---

## 🔮 Future Enhancements

- Online Rent Payment Integration
- Real-Time Chat System
- Google Maps Integration
- Property Recommendation System
- Email & SMS Notifications
- Wishlist / Favorite Properties
- AI-Based Property Suggestions

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the Repository
2. Create a Feature Branch
3. Commit Changes
4. Push to Branch
5. Create a Pull Request

---


## 👨‍💻 Author

Developed using the MERN Stack for efficient property rental management and booking.
