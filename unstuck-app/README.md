# Unstuck - AI Quiz Generator

The frontend of this project is a modern web application built with **Next.js 15** using the **App Router** architecture. It provides an interactive experience where users can upload a PDF, generate a quiz using OpenAI, and answer questions with instant feedback and review capabilities.

---

## ✨ Features

- 📄 Upload a PDF file to generate questions automatically  
- 🤖 Integration with an OpenAI-powered backend to generate quizzes  
- ✅ Real-time quiz experience with scoring and answer review  
- 📦 State management with **Zustand** (with persistence)  
- 🌙 Clean UI built with **TailwindCSS**, **shadcn/ui**, and **OriginUI**  
- ⚛️ Typed and optimized with **TypeScript**  
- ⚡️ Data fetching and caching with **TanStack React Query**  
- 📐 Utility-based styling with `clsx`, `tailwind-merge`, and `class-variance-authority`  

---

## 🧱 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router + Turbopack)  
- **Language**: TypeScript  
- **Styling**: TailwindCSS + shadcn/ui + OriginUI  
- **State Management**: Zustand with `persist` middleware  
- **Networking**: TanStack React Query  
- **Icons**: lucide-react  
- **Component Composition**: Radix UI primitives  

---

## 📁 Folder Structure (simplified)

```
.
├── app/                      # App Router pages and layouts
│   └── (quiz-journey)/
│             ├── quiz/       # Quiz and Results Page
│             └── page.tsx/   # Home
├── components/               # Reusable UI components (e.g. CheckBox, Buttons)
├── hooks/                    # Custom Zustand and other hooks
├── contracts/                # TypeScript types/interfaces (e.g. QuizQuestion)
├── lib/                      # API utilities and helpers
├── providers/                # Providers
└── styles/                   # Tailwind config & global styles
```

---

## 🚀 Running the Project Locally

> Make sure the [backend API](http://localhost:8000) is already running.

### 1. Clone the repository

```bash
git clone https://github.com/jovimoura/unstuck.git
cd unstuck
```

### 2. Install dependencies

```bash
cd unstuck-app
npm install
```

### 3. Run the app locally

```bash
npm run dev
```

The app will be running on `http://localhost:3000`.

---

## ⚙️ Environment Variables

Make sure to configure the API base URL in a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📦 Dependencies

This project uses the following main packages:

```json
"next": "15.4.5",
"react": "19.1.0",
"tailwindcss": "^4",
"zustand": "^5.0.7",
"@tanstack/react-query": "^5.83.0",
"shadcn/ui": "*",
"radix-ui": "^1.4.2",
"originui": "*"
```

---

## ✅ Quiz State Management (Zustand)

All quiz questions, answers, and the `quizId` are stored globally using Zustand with persistence, allowing the user to refresh or navigate between pages without losing their progress.
