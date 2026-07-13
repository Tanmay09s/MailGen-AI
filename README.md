# 🚀 MailGen AI

An AI-powered Cold Email Generator built using the MERN Stack and Google's Gemini AI.

MailGen AI helps job seekers, freelancers, and sales professionals generate personalized outreach emails, LinkedIn messages, and follow-up emails in seconds.

The application includes secure authentication, email verification using OTP, campaign history management, Docker support, and a modern responsive interface.

---

# 🌐 Live Demo

👉 **https://mail-gen-ai.vercel.app**

---

## 📖 Project Overview

Writing professional outreach emails manually takes time and often leads to inconsistent results.

MailGen AI solves this problem by leveraging Google's Gemini AI to generate:

- Professional Cold Emails
- Personalized Subject Lines
- LinkedIn Connection Requests
- Follow-up Emails

Users simply provide context about themselves and the target company, and the AI generates an optimized outreach campaign.

The application securely stores every generated campaign so users can revisit or delete them anytime.

---

## ✨ Features

### 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- OTP Email Verification
- Protected Routes

### 🤖 AI Features

- AI-generated Cold Emails
- AI-generated Subject Lines
- LinkedIn DM Generator
- Follow-up Email Generator
- Personalized Responses

### 📁 History

- View Previous Campaigns
- Search Campaigns
- Delete Campaigns
- Copy Generated Content

### 🎨 UI

- Responsive Design
- Premium Dashboard
- Modern Tailwind CSS UI
- Loading Indicators
- Toast Notifications

### ⚙ Backend

- REST API
- MongoDB Database
- Secure Password Hashing
- Authentication Middleware

### 🐳 Deployment

- Dockerized Frontend
- Dockerized Backend
- Docker Compose Support

---

## ⚠ Demo Account

If registration is temporarily unavailable due to email verification service limits or deployment issues, you can explore the application using the demo account below.

### Demo Credentials

```text
Email: tannyshahapure@gmail.com
Password: 123456
```

The demo account provides access to:

- AI Email Generation
- AI Subject Generation
- LinkedIn Message Generation
- Follow-up Email Generation
- Campaign History
- Delete Campaigns
- Copy Generated Content

> **Note**
>
> The deployed version uses free-tier services. If registration or OTP email delivery is temporarily unavailable, simply use the demo account above.

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- Heroicons

### Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt
- Nodemailer
- Gemini AI API

### Database

- MongoDB
- Mongoose

### DevOps

- Docker
- Docker Compose

### Version Control

- Git
- GitHub

---

## 🏗 Project Architecture

```text
               User
                 │
                 ▼
        React Frontend
                 │
             Axios API
                 │
                 ▼
         Express Backend
                 │
      Authentication Layer
                 │
        Gemini AI Service
                 │
          MongoDB Database
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/Tanmay09s/MailGen-AI.git
```

```bash
cd MailGen-AI
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

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

EMAIL_USER=

EMAIL_PASS=

GEMINI_API_KEY=
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶ Running the Project

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

Visit:

```text
http://localhost:5173
```

---

## 🌐 Deployment

### Live Application

https://mail-gen-ai.vercel.app

---

## 🐳 Docker Support

Build and start all services using Docker Compose.

```bash
docker compose up --build
```

Stop containers

```bash
docker compose down
```

---

## 🗄 Database Schema

### User

```text
name
email
password
verified
createdAt
```

### Email History

```text
userId
prompt
subject
emailBody
linkedInDM
followUpEmail
createdAt
```

---

## 📂 Project Structure

```text
MailGen-AI
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── Controllers
│   ├── Middleware
│   ├── Models
│   ├── Routes
│   ├── Services
│   ├── Config
│   └── package.json
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 🚀 Future Enhancements

- Export Emails as PDF
- Export Emails as DOCX
- Campaign Analytics
- Favorite Campaigns
- Advanced Search & Filters
- AI Templates
- Email Scheduling
- Multi-language Support
- Dark / Light Theme
- Rich Text Email Editor

---

## 👨‍💻 Author

**Tanmay Shahapure**

GitHub:  
https://github.com/Tanmay09s

LinkedIn:  
https://www.linkedin.com/in/tanmay-shahapure-b982322ba

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

Happy Coding! 🚀
