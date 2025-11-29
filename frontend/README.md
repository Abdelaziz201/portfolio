# Portfolio Website

A modern, full-stack portfolio website featuring a cosmic space theme with dynamic content management capabilities.

## 🌟 Overview

This is a responsive portfolio website built for showcasing projects, skills, and professional information. The application includes a comprehensive admin panel for managing all portfolio content dynamically without code changes.

## ✨ Features

### Public Features

- **Hero Section**: Animated introduction with smooth scroll indicators
- **About Section**: Dynamic personal information and services with customizable content
- **Skills Section**: Interactive skill showcase with categories and proficiency levels
- **Projects Section**: Portfolio gallery with image carousels, tags, and links to GitHub/demo
- **Space Weather Section**: Integration with NASA's Astronomy Picture of the Day (APOD) API
- **Contact Section**: Contact form with email notifications and social media links
- **Responsive Design**: Fully responsive across all device sizes
- **Theme Toggle**: Dark/light mode support
- **Star Background**: Animated cosmic background effects
- **Smooth Navigation**: Sticky navbar with smooth scrolling

### Admin Features

- **Authentication**: Secure login with JWT tokens and password reset functionality
- **Content Management**: Full CRUD operations for:
  - About Me information (title, descriptions, services, CV URL)
  - Contact Information (email, phone, location, social links)
  - Projects (with image uploads, tags, GitHub/demo URLs)
  - Skills (name, level, category)
- **Message Management**: View and manage contact form submissions
- **Image Upload**: Support for project image uploads via Multer
- **Email Notifications**: Automatic email notifications for contact form submissions

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **React Router DOM 7.8.2** - Client-side routing
- **Lucide React 0.542.0** - Icon library
- **Radix UI Toast** - Toast notifications
- **clsx & tailwind-merge** - Utility functions for className management

### Backend

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.18.3** - MongoDB object modeling
- **JSON Web Token (JWT) 9.0.2** - Authentication
- **bcrypt 6.0.0** - Password hashing
- **Multer 2.0.2** - File upload handling
- **Nodemailer 6.10.1** - Email service
- **Mailtrap 4.3.0** - Email testing (development)
- **Express Validator 7.3.0** - Input validation
- **Cookie Parser 1.4.7** - Cookie handling
- **CORS 2.8.5** - Cross-origin resource sharing

### External APIs

- **NASA APOD API** - Astronomy Picture of the Day integration

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutSection.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── SpaceWeatherSection.jsx
│   │   │   ├── StarBackground.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── Pages/
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   └── package.json
│
└── backend/
    ├── config/
    │   ├── db.js
    │   └── generateTokenAndSetCookie.js
    ├── controllers/
    │   ├── aboutMe.controller.js
    │   ├── auth.controller.js
    │   ├── contactInfo.controller.js
    │   ├── getInTouch.controller.js
    │   ├── projects.controller.js
    │   ├── skills.controller.js
    │   └── user.controller.js
    ├── middleware/
    │   └── upload.js
    ├── models/
    │   ├── aboutMe.model.js
    │   ├── contactInfo.model.js
    │   ├── getInTouch.model.js
    │   ├── projects.model.js
    │   ├── skills.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── aboutMe.router.js
    │   ├── auth.router.js
    │   ├── contactInfo.router.js
    │   ├── getInTouch.router.js
    │   ├── projects.router.js
    │   ├── skills.router.js
    │   └── user.router.js
    ├── mailtrap/
    │   ├── emails.js
    │   ├── emailTemplates.js
    │   └── mailtrap.confg.js
    ├── Photos/ (uploaded project images)
    ├── server.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- NASA API Key (optional, for Space Weather section)

### Environment Variables

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_NASA_API_KEY=your_nasa_api_key_here
```

#### Backend (.env)

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install Frontend Dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**

   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**

   - Create `.env` files in both `frontend` and `backend` directories
   - Add the required environment variables as shown above

5. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

6. **Start the Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📝 API Endpoints

### Authentication

- `POST /api/users/signin` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/verify` - Verify JWT token
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password

### About Me

- `GET /api/aboutMe` - Get about information
- `POST /api/aboutMe` - Create about information
- `PUT /api/aboutMe/:id` - Update about information

### Contact Info

- `GET /api/contactInfo` - Get contact information
- `PUT /api/contactInfo` - Update contact information

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/upload` - Upload project image
- `DELETE /api/projects/images/:filename` - Delete project image

### Skills

- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Get In Touch (Contact Form)

- `GET /api/getInTouch` - Get all messages
- `POST /api/getInTouch` - Submit contact form
- `POST /api/getInTouch/send-email` - Send email notification
- `PUT /api/getInTouch/:id` - Update message status
- `DELETE /api/getInTouch/:id` - Delete message

## 🎨 Design Features

- **Cosmic Theme**: Space-inspired design with star animations
- **Glassmorphism**: Backdrop blur effects on cards and navigation
- **Smooth Animations**: Fade-in animations and hover effects
- **Responsive Grid Layouts**: Adaptive layouts for all screen sizes
- **Custom CSS Utilities**: Reusable utility classes for consistent styling

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Secure cookie handling
- CORS configuration
- Input validation with express-validator
- Protected admin routes

## 📧 Email Configuration

The application uses Nodemailer with Mailtrap for email notifications. Configure your email settings in the backend `.env` file. For production, update the email configuration to use your preferred SMTP service.

## 🚀 Deployment

### Frontend

- Build: `npm run build`
- Output: `dist/` directory
- Deploy to: Vercel, Netlify, or any static hosting service

### Backend

- Ensure MongoDB is accessible
- Set production environment variables
- Deploy to: Heroku, Railway, Render, or any Node.js hosting service

## 📄 License

This project is private and proprietary.

## 👤 Author

**Abdelaziz Abdelkarim**

- Full-Stack Developer
- Software Engineer

---

Built with ❤️ using React, Node.js, and MongoDB
