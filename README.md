#                        MeatTruck

MeatTruck is a Full-Stack Platform where indiviudals and sellers can trade bulk meat and live-stock 
It was not for retail transactions the platform is mainly built traders and dealers
All the Goverment guidelines and rules are being taken care while building this website



## 📘 Contribution Guide

To learn how to contribute, please check the [Contribution Guide](./CONTRIBUTION.md).
CONTRIBUTION.md


### Mike testing

## 3. Set Up Guide 


#### Frontend SetUp 
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

`
npm install next
npm run dev || start

`


#### Backend SetUp

In IntelliJ, go to Run → Edit Configurations → select your Spring Boot app → under "Environment variables" click `...` and add your .env values like `DB_HOST=localhost;DB_PORT=5432;`.

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

# ---- Server ----
PORT=8080


CORS_ORIGINS=http://localhost:3000

```