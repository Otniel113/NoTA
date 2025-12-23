# NoTA (No Thought Abandonment)

NoTA is a simple sticky note full-stack application designed for a coding interview. It allows users to capture their thoughts quickly and manage them efficiently.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Material Icons

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)

## ✨ Features

### Frontend
- **Note Management:** Create, Read, Update, and Delete notes.
- **Search:** Find notes by title or content.
- **Interactive UI:** Modal-based workflows for adding, viewing, and editing notes.
- **Responsive Design:** Optimized for both desktop and mobile views.
- **Visibility Control:** Toggle note visibility between "Public" and "Members".
- **Profile Management:** Securely change user password.

### Backend
- **Authentication:** Register, Login, Logout, and Profile management.
- **Authorization:** Role-based access (Public vs. Member notes).
- **CRUD Operations:** Full Create, Read, Update, Delete support for Notes.
- **Security:** Password hashing (Bcrypt), JWT validation, and Token Blacklisting.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB Atlas Account (or local MongoDB)

### Installation & Running

#### Frontend
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

#### Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the `backend` folder with the following:
    ```env
    PORT=5000
    FRONTEND_URL=http://localhost:4000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```
    or Copy it from .env.example file.

4.  Start the server:
    ```bash
    npm run start:dev
    ```
    The API will be available at `http://localhost:5000`.

## 📂 Project Structure

```
NoTA/
├── frontend/          # Next.js Frontend Application
│   ├── app/           # App Router Pages & Layouts
│   ├── components/    # Reusable UI Components (Modals, Cards)
│   └── public/        # Static Assets
└── backend/           # NestJS Backend Application
    ├── src/
    │   ├── auth/      # Authentication Module (JWT, Guards)
    │   ├── notes/     # Notes Module (CRUD, Schemas)
    │   ├── users/     # Users Module (User Management)
    │   └── ...
```
