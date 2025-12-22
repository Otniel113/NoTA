# NoTA (No Thought Abandonment)

NoTA is a simple sticky note full-stack application designed for a coding interview. It allows users to capture their thoughts quickly and manage them efficiently.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Material Icons

### Backend
- **Status:** 🚧 Still on Progress
- **Framework:** NestJS (Planned)

## ✨ Features (Frontend)

- **Note Management:** Create, Read, Update, and Delete notes.
- **Interactive UI:** Modal-based workflows for adding, viewing, and editing notes.
- **Responsive Design:** Optimized for both desktop and mobile views.
- **Visibility Control:** Toggle note visibility between "Public" and "Members".

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Running

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Copy the .env.example file to your own .env file
    ```bash
    cp -n .env.example .env
    ```
    And adjust it to your own env.

4.  Start the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit:
    `http://localhost:4000`



## 📂 Project Structure

```
NoTA/
├── frontend/          # Next.js Frontend Application
│   ├── app/           # App Router Pages & Layouts
│   ├── components/    # Reusable UI Components (Modals, Cards)
│   └── public/        # Static Assets
└── backend/           # NestJS Backend (In Progress)
```