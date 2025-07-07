# 🐾 pawConnect - Pet Adoption & Donation Platform

**Live Site**: [https://pawconnect.adopt-now.app](https://pawconnect.adopt-now.app)  
**Server Repo**: [GitHub Server Link](https://github.com/yourusername/pawconnect-server)  
**Client Repo**: [GitHub Client Link](https://github.com/yourusername/pawconnect-client)

---

## 🌟 Project Overview

**pawconnect** is a MERN stack-based pet adoption and donation platform designed to connect loving humans with adorable pets in need of homes. It also enables users to support pet care through donation campaigns. Built with a focus on usability, responsiveness, and clean UI/UX, the platform empowers both pet seekers and donors.

---

## ✨ Key Features

### 🏠 Public Pages:
- **Homepage** with banner, pet categories, mission statement, and inspirational content
- **Pet Listings** with infinite scroll, filtering, and search
- **Pet Details** with option to adopt
- **Donation Campaigns** with infinite scroll
- **Donation Details** with Stripe payment integration

### 👤 Authentication:
- Email/password registration with Firebase
- Google & GitHub social login
- Secure JWT-based session handling
- Role-based dashboard routing (admin/user)

### 🧑 User Dashboard:
- Add, Update, Delete pets
- View & manage adoption requests
- Create and manage donation campaigns
- Track personal donations and request refunds

### 🛠️ Admin Dashboard:
- Promote users to admin
- Monitor and manage all registered users

### 💡 Technologies Used:
- **Frontend**: React, React Router, Tailwind CSS, TanStack Query, Axios, Stripe.js
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Authentication**: Firebase Auth
- **Image Hosting**: Cloudinary / ImgBB API
- **Form Handling**: React Hook Form
- **Data Table**: TanStack Table

---

## 📁 Folder Structure



/pawconnect-client
├── src
│ ├── components
│ ├── pages
│ ├── routes
│ ├── hooks
│ └── layout

/pawconnect-server
├── controllers
├── routes
├── models
├── middleware
└── config





---

## 🛡️ Security and Optimization

- ✅ Environment variables used to secure Firebase and MongoDB credentials
- ✅ Firebase domain whitelisting for production deployment
- ✅ No private route refresh redirect issues
- ✅ Fully responsive on all devices

---

## 📦 NPM Packages Used

### Client:
- `react-router-dom`
- `react-hook-form`
- `axios`
- `@tanstack/react-query`
- `@tanstack/react-table`
- `firebase`
- `sweetalert2`
- `stripe-js`
- `@stripe/react-stripe-js`
- `react-select`
- `moment`

### Server:
- `express`
- `mongoose`
- `cors`
- `jsonwebtoken`
- `dotenv`
- `bcryptjs`

---

## 🚀 Deployment

- **Client**: [Vercel / Netlify](https://vercel.com/)
- **Server**: [Render / Cyclic / Railway](https://render.com/)
- CORS & refresh issues handled
- Environment variables secured

---

## 🙋‍♂️ Developer

**Name**: Jaber Ahmed (aka Jack Sargey)  
**Role**: Full-stack Developer (MERN)  
**Portfolio**: [jack-sargey.dev](https://jack-sargey.dev)  
**Email**: jack@example.com

---

## 📌 Final Note

This project is a part of the **Assignment 12 - Pet Adoption Platform** under **Category 006**. It focuses on real-world application of MERN technologies to create meaningful social impact by helping animals find loving homes and donors support their care.

---

> “Saving one animal won’t change the world, but surely, for that one animal, the world will change forever.”

