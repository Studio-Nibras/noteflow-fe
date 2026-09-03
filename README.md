# Noteflow

> AI-Powered Smart Note Taking Platform with Mind Mapping, Quiz Generation, and Learning Analytics.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-blue?logo=google)
![License](https://img.shields.io/badge/License-MIT-green)

---

# About

**Noteflow** adalah platform pembelajaran adaptif berbasis Artificial Intelligence yang membantu mahasiswa dalam membuat catatan, memahami materi, serta mengevaluasi pemahaman mereka melalui visualisasi Mind Map dan AI Quiz Generator.

Project ini dikembangkan sebagai solusi pembelajaran modern khususnya untuk membantu mahasiswa, termasuk mahasiswa tunarungu, melalui teknologi AI, Speech-to-Text, Mind Mapping, dan Learning Analytics.

---

# Features

## Smart Workspace

- Rich Text Editor (Tiptap)
- Auto Save
- Local Storage
- Modern Workspace UI

## AI Mind Mapping

Mengubah catatan menjadi Mind Map secara otomatis menggunakan AI.

Fitur:

- Interactive Node
- Multiple Layout
  - Flow
  - Tree
  - Bubble
  - Multi Flow
- Drag & Drop
- Zoom
- Export PNG

---

## AI Quiz Generator

Menghasilkan soal pilihan ganda secara otomatis berdasarkan isi catatan.

Fitur:

- AI Generated Questions
- Multiple Choice
- Instant Evaluation
- Quiz Result

---

## Learning Analytics

Memberikan insight mengenai proses belajar pengguna.

Contoh:

- Total Notes
- Quiz Accuracy
- Learning Progress
- Activity History

---

## History

- Saved Notes
- Generated Mind Maps
- Quiz History

---

## User Management

- Login
- Register
- Authentication
- User Profile

---

# Tech Stack

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Tiptap Editor
- React Flow (@xyflow/react)
- Axios
- Lucide React

## Backend

- Express.js
- Node.js

## Database

- Supabase

## Artificial Intelligence

- Google Gemini API

---

# Project Structure

```
noteflow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   │
│   └── public/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Studio-Nibras/noteflow-fe.git
```

Masuk ke folder project

```bash
cd noteflow-fe
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan pada:

```
http://localhost:5173
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend berjalan pada:

```
http://localhost:3000
```

---

# Workflow

```text
Create Note
      │
      ▼
Workspace Editor
      │
      ▼
Generate Mind Map
      │
      ▼
Edit Mind Map
      │
      ▼
Generate Quiz
      │
      ▼
Answer Quiz
      │
      ▼
Overview & Analytics
```

---

# Future Development

- [ ] Speech-to-Text
- [ ] Image Upload
- [ ] PDF Upload
- [ ] Sign Language Recognition
- [ ] AI Learning Recommendation
- [ ] Quiz Battle (Realtime)
- [ ] Collaborative Workspace
- [ ] Cloud Sync
- [ ] Dark Mode
- [ ] Mobile Responsive Optimization

---

# Authors

- Rosid Hakimudin

# License

This project is licensed under the MIT License.

---

#  Inspiration

> "Learn Smarter, Not Harder."

Noteflow hadir untuk membantu proses belajar menjadi lebih visual, adaptif, dan interaktif melalui pemanfaatan Artificial Intelligence.
