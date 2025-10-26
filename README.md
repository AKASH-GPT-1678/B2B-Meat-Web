# 🥩 MeatTruck

**MeatTruck** is a Full-Stack Platform where individuals and sellers can trade bulk meat and livestock.  
It is not meant for retail transactions — the platform is primarily designed for traders and dealers.  
All Government guidelines and compliance rules are followed during development.

---

## 📘 Contribution Guide

To learn how to contribute, please check the [Contribution Guide](./CONTRIBUTION.md).

---

## 🚀 Features & Tools

- Bulk meat and livestock trading platform
- Secure payments via **Razorpay**
- OAuth login with **Google**
- Admin and seller dashboards
- Real-time notifications
- CORS-enabled for frontend-backend communication

---

### 🧩 Tech Stack  
Frontend: Next.js 14, TypeScript, Tailwind, Razorpay, OAuth  
Backend: Spring Boot 3.x, Java 17  
Database: PostgreSQL 15  
Cloud & Storage: AWS S3  
Email Notifications: Gmail SMTP  

---

## 🌐 Live Demo

> (Optional) Add your live link here:  
[Visit Website](https://b2-b-meat-web-pdvm.vercel.app/)

---

## 🛠️ Set Up Guide

### Frontend Setup

Create a `.env` file in the frontend root directory and add:

```

RAZORPAY_KEY_ID=
RAZORPAY_SECRET_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=YOUR_NEXT_AUTH_URL
NEXT_PUBLIC_BACKEND_URL=
NEXTAUTH_SECRET=
```


Install dependencies and start the frontend:

```bash
npm install
npm run dev
# For production
npm run build
npm start
```

Backend Setup

In IntelliJ:
Run → Edit Configurations → select your Spring Boot app → Environment variables → click ... and add your .env values like:
DB_HOST=localhost;DB_PORT=5432;DB_NAME=meattruck;DB_USER=postgres;DB_PASS=1234;

Create a .env file in the backend root directory:
```
SPRING_APPLICATION_NAME=backendd

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=

MAIL_USERNAME=
MAIL_PASSWORD=

AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
AWS_BUCKET=

PORT=8080
CORS_ORIGINS=http://localhost:3000
```

### 📸 Screenshots



### ⚙️ Environment

Node.js >= 18

Java 17

PostgreSQL 15

IntelliJ IDEA / VS Code


### 📄 License

This project is licensed under the MIT License - see the LICENSE
 file for details.

### ❤️ Acknowledgements

Thanks to Razorpay for payment integration

Thanks to AWS for storage and hosting

Inspired by real-world bulk meat trading platforms