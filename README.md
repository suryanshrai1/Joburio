# Joburio

**Joburio** is a full-featured, modern job portal connecting job seekers with top companies. Built with React, Vite, and TailwindCSS, it offers a smooth and intuitive user experience for candidates, employers, and administrators alike.

![Joburio Screenshot](public/preview.jpg) 

---

## 🚀 Live Demo

🌐 Coming sooon...

---

## ✨ Features Overview

### 🔍 Job Discovery & Listings
- Advanced search with filters (location, job type, industry, skills)
- Featured jobs and trending companies
- Real-time data updates for listings

### 👥 User Accounts & Authentication
- Secure JWT-based authentication system
- Google/Facebook OAuth (optional)
- Separate dashboards for job seekers and employers
- Password recovery/reset support

### 🧾 Job Applications
- Apply to jobs with one or two clicks
- Track application status (pending, interview, rejected)
- Add notes and reminders per application

### 🏢 Employer Tools
- Post/manage job listings
- Track and approve or reject applicants
- Company profiles with branding and culture highlights

### 📊 Admin Panel
- Manage users and job posts
- Moderate reported content
- View analytics (job listings, applications, engagement)

### 🔔 Notifications & Alerts
- Job alerts based on criteria
- Interview invites from companies
- Real-time application updates

---

## 🧱 Tech Stack

| Category       | Technology                                        |
|----------------|----------------------------------------------------|
| Frontend       | React 18, Vite, TypeScript                         |
| UI/UX          | Tailwind CSS, Radix UI, Lucide Icons               |
| Animations     | Framer Motion, Three.js                            |
| Routing        | React Router v6                                    |
| Forms          | React Hook Form + Zod                              |
| State/Data     | React Query                                        |
| Auth           | JWT (JSON Web Tokens)                              |
| Styling Logic  | Class Variance Authority, clsx + tailwind-merge   |
| Testing        | Vitest                                             |

---

## 🗂️ Project Structure

src/
├── components/ # Reusable UI components
│ └── ui/ # Button, Card, Avatar, etc.
├── pages/ # Route-level pages like Index.tsx
├── lib/ # Utility functions (e.g., cn)
├── contexts/ # Context providers (DataContext, AuthContext, etc.)
├── App.tsx # Route definitions and layout
└── index.tsx # Main React entry point


---

## 🧪 Development & Testing

| Command             | Description                            |
|---------------------|----------------------------------------|
| `npm install`       | Install project dependencies           |
| `npm run dev`       | Start development server               |
| `npm run build`     | Build for production                   |
| `npm run typecheck` | Run TypeScript validations             |
| `npm run test`      | Run unit tests using Vitest            |

---

## 💻 Run Locally

```bash
git clone https://github.com/suryanshrai1/joburio.git
cd joburio
npm install
npm run dev
```
Open http://localhost:5173 in your browser.

### 📄 License
MIT © suryanshrai1

### 🤝 Contributing
Pull requests and suggestions are welcome! Please open an issue first to discuss any major changes.

### 👤 Author
Made with ❤️ by Suryansh Rai
Linkedin- https://www.linkedin.com/in/suryanshrai1/