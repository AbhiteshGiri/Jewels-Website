<div align="center">

# 💎 **Shiv Shakti Jewellers** 💎

### *Where Elegance Meets Excellence*

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0+-brightgreen.svg)](https://mongodb.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.3-blueviolet.svg)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**A modern, elegant jewellery showcase website designed to beautifully present exclusive collections with seamless navigation, advanced filters, and personalized customer engagement.**

[🌟 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [✨ Request Feature](#)

---

</div>

## 📋 **Table of Contents**

- [✨ Features Overview](#-features-overview)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📱 Pages & Functionalities](#-pages--functionalities)
- [⚙️ Backend Architecture](#️-backend-architecture)
- [🎨 UI/UX Design](#-uiux-design)
- [🌍 Deployment](#-deployment)
- [🔮 Future Enhancements](#-future-enhancements)
- [👨‍💻 Developer](#-developer)

---

## ✨ **Features Overview**

<div align="center">

| Feature | Description |
|:-------:|:------------|
| 🎨 | **Stunning Banner Carousel** - Dynamic sliders with sparkling collections |
| 💍 | **Advanced Product Filters** - Category, material, price & gender filters |
| 📞 | **Multi-Channel Contact** - WhatsApp, phone, email & location integration |
| 📱 | **Floating WhatsApp Button** - Instant customer support access |
| 🔐 | **Secure Authentication** - JWT-based login with OTP verification |
| 🖼️ | **Image Upload System** - Multer-powered product & profile uploads |
| 📧 | **Email Notifications** - Elegant dark-themed transactional emails |
| 🛡️ | **Admin Panel** - Complete product & user management dashboard |
| 🌐 | **Fully Responsive** - Perfect display on all devices |
| 🤝 | **WhatsApp Integration** - Direct product inquiries via WhatsApp |

</div>

---

## 🛠 **Tech Stack**

<div align="center">

### **Frontend Technologies**
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

### **Backend Technologies**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### **Libraries & Tools**
![Owl Carousel](https://img.shields.io/badge/Owl_Carousel-2.3.4-orange?style=for-the-badge)
![Animate.css](https://img.shields.io/badge/Animate.css-4.1-ff69b4?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9-blue?style=for-the-badge)
![Multer](https://img.shields.io/badge/Multer-1.4-red?style=for-the-badge)

</div>

---

## 🚀 **Quick Start**

### **Prerequisites**
```bash
Node.js v18+ | MongoDB v6.0+ | npm or yarn
```

### **Installation Steps**

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/shiv-shakti-jewellers.git

# 2️⃣ Navigate to project directory
cd shiv-shakti-jewellers

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create .env file and add your credentials
cp .env.example .env

# 5️⃣ Start the server
npm start

# 6️⃣ Open in browser
http://localhost:3000
```

### **Environment Variables**
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
WHATSAPP_NUMBER=+919876543210
```

---

## 📱 **Pages & Functionalities**

<details>
<summary><b>🏠 Home Page (index.html)</b></summary>

- ✅ Dynamic carousel with premium collection banners
- ✅ Smooth scrolling animated sections
- ✅ Brand story showcase
- ✅ Featured jewellery highlights
- ✅ New arrivals section
- ✅ Call-to-action buttons (Shop Now / Explore)
- ✅ Responsive header & footer with quick links

</details>

<details>
<summary><b>💍 Product Collection Page (collection.html)</b></summary>

- ✅ Elegant gold-accented product cards
- ✅ Product details: Image, Title, Category, Material, Price
- ✅ "Inquire on WhatsApp" button for each product
- ✅ **Real-time Filters:**
  - 🔹 Category (Rings, Necklaces, Earrings, Bracelets)
  - 🔹 Gender (Men, Women, Unisex)
  - 🔹 Price range slider
  - 🔹 Material type (Gold, Diamond, Silver)
- ✅ Search functionality
- ✅ Sort by price (Low to High / High to Low)

</details>

<details>
<summary><b>📞 Contact Page (contact.html)</b></summary>

- ✅ Interactive contact form (Name, Email, Message)
- ✅ Instant WhatsApp chat button
- ✅ Embedded Google Map with store location
- ✅ Social media icons with hover animations
- ✅ Phone & email links
- ✅ Fully responsive layout

</details>

<details>
<summary><b>🧑‍💼 Admin Panel (Backend Dashboard)</b></summary>

- ✅ Secure admin login with JWT authentication
- ✅ Add new products with image upload
- ✅ View & manage product inventory
- ✅ Edit or delete jewellery items
- ✅ User management system
- ✅ Contact form submissions inbox
- ✅ Analytics dashboard (coming soon)

</details>

---

## ⚙️ **Backend Architecture**

### 🗃️ **Database Schema (MongoDB + Mongoose)**

```javascript
// Product Schema
{
  name: String,
  category: String,
  material: String,
  price: Number,
  description: String,
  image: String,
  gender: String,
  createdAt: Date
}

// User Schema
{
  name: String,
  email: String (unique),
  password: String (hashed),
  mobile: String,
  profileImage: String,
  isVerified: Boolean,
  createdAt: Date
}

// Contact Schema
{
  name: String,
  email: String,
  message: String,
  timestamp: Date
}
```

### 🔐 **Authentication Flow**

```
User Signup → OTP Sent to Email → User Verifies OTP → Account Activated → JWT Token Generated → User Logged In
```

### 📤 **File Upload System**

- **Multer Disk Storage** for handling multipart form data
- Profile pictures stored in `/uploads/profile/`
- Product images stored in `/uploads/products/`
- Unique filename generation with timestamp
- VPS hosting compatible

### 📧 **Email System**

**Dark-themed, card-style templates for:**
- ✉️ Signup verification
- 🔐 OTP login alerts
- 🔑 Password reset
- 👋 Welcome emails
- 📬 Contact form notifications

Powered by **Nodemailer** with elegant inline CSS styling

### 🌐 **API Routes**

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/signup/request` | POST | User registration with OTP | ❌ |
| `/api/auth/verify-otp` | POST | OTP verification | ❌ |
| `/api/auth/login` | POST | User login with JWT | ❌ |
| `/api/auth/reset-password` | POST | Password reset request | ❌ |
| `/api/products` | GET | Fetch all products | ❌ |
| `/api/products/add` | POST | Add new product | ✅ Admin |
| `/api/products/:id` | PUT | Update product | ✅ Admin |
| `/api/products/:id` | DELETE | Delete product | ✅ Admin |
| `/api/contact/send` | POST | Submit contact form | ❌ |

---

## 🎨 **UI/UX Design**

### **Color Palette**
```css
Primary Gold:   #D4AF37
Primary Black:  #1A1A1A
Pure White:     #FFFFFF
Accent Gold:    #C9A62E
Dark Gray:      #2D2D2D
```

### **Design Principles**
- 🎭 **Premium Aesthetics** - Royal black, gold & white theme
- ✨ **Subtle Animations** - Fade-ins and smooth transitions
- 🖼️ **Visual Hierarchy** - Clear content structure
- 📱 **Mobile-First** - Responsive from 320px to 4K
- ♿ **Accessibility** - WCAG 2.1 compliant
- 🎯 **User-Centric** - Intuitive navigation

### **Key UI Components**
- Sticky navigation with smooth scroll
- Collapsible mobile menu
- Interactive product cards with hover effects
- Floating action buttons (WhatsApp)
- Loading animations
- Toast notifications

---

## 🌍 **Deployment**

### **Hosting Platforms**
- **Backend**: Node.js on Hostinger VPS / AWS EC2
- **Database**: MongoDB Atlas (Cloud)
- **Frontend**: Hostinger / Netlify / Vercel
- **File Storage**: VPS `/uploads` directory

### **Deployment Commands**
```bash
# Build for production
npm run build

# Start production server
npm run start:prod

# PM2 process manager (recommended)
pm2 start server.js --name shiv-shakti-jewellers
pm2 save
pm2 startup
```

---

## 🔮 **Future Enhancements**

<div align="center">

| Priority | Feature | Status |
|:--------:|:--------|:------:|
| 🔴 | Online cart & payment gateway integration | 📋 Planned |
| 🟠 | Admin analytics dashboard | 🚧 In Progress |
| 🟡 | AI-powered product recommendations | 📋 Planned |
| 🟢 | PWA (Progressive Web App) | 📋 Planned |
| 🔵 | Multi-language support (Hindi, English) | 📋 Planned |
| 🟣 | AI chatbot for customer queries | 📋 Planned |
| ⚪ | Wishlist & favorites system | 📋 Planned |
| 🟤 | Customer review & rating system | 📋 Planned |

</div>

---

## 🛡️ **Security Features**

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Input validation & sanitization
- ✅ XSS & SQL injection protection
- ✅ CORS enabled
- ✅ Rate limiting on API endpoints
- ✅ Secure file upload with type validation
- ✅ Environment variables for sensitive data

---

## 📊 **Project Structure**

```
shiv-shakti-jewellers/
├── 📁 public/
│   ├── 📁 css/
│   │   └── style.css
│   ├── 📁 js/
│   │   └── main.js
│   ├── 📁 img/
│   ├── index.html
│   ├── collection.html
│   └── contact.html
├── 📁 server/
│   ├── 📁 controllers/
│   ├── 📁 models/
│   ├── 📁 routes/
│   ├── 📁 middleware/
│   ├── 📁 utils/
│   └── server.js
├── 📁 uploads/
│   ├── 📁 products/
│   └── 📁 profile/
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 👨‍💻 **Developer**

<div align="center">

### **Made with 💖 & Elegance by**

# **Abhitesh Giri** &  **Anuj Upadhyay** 

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abhiteshgiri)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abhitesh-giri-3924a3245/)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://abhiteshgiri.github.io/portfolio/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRrkzVhWhqTRhkhSKdFSnxVZLqwgNlxkPpkQXVtPqdsqbXNpQWFvpKLTZdgHpKZVxndDXDB)

</div>

---

## 📜 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

<div align="center">

**Special Thanks To:**

- 🎨 **Bootstrap Team** - For the responsive framework
- 🦉 **Owl Carousel** - For seamless sliders
- ✨ **Animate.css** - For beautiful animations
- 🎯 **Bootstrap Icons** - For clean UI elements
- 💚 **MongoDB Team** - For robust database solutions
- 🚀 **Node.js Community** - For excellent backend ecosystem

</div>

---

<div align="center">

### ⭐ **If you like this project, please give it a star!** ⭐

**Made with 💎 for luxury jewellery showcase**

© 2025 Shiv Shakti Jewellers. All Rights Reserved.

</div>