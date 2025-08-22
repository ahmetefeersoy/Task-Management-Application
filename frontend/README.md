# Frontend - Task Management Application

Modern React frontend application with TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Technologies

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Axios** for API communication
- **React Hot Toast** for notifications

## 📁 Project Structure

```
frontend/src/
├── components/         # Reusable UI components
├── pages/             # Main application pages
│   ├── LoginPage.tsx  # User authentication
│   ├── RegisterPage.tsx # User registration
│   └── TasksPage.tsx  # Main task management
├── store/             # Redux store configuration
│   ├── authslice.ts   # Authentication state
│   ├── taskslice.ts   # Task management state
│   └── index.ts       # Store configuration
├── utils/             # Utility functions
│   └── axiosInstance.ts # API client setup
├── App.tsx            # Main app component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎨 Features

### Authentication
- **User Registration**: Create new accounts with email/username
- **User Login**: Secure JWT-based authentication
- **Auto-logout**: Token expiration handling
- **Protected Routes**: Authentication-required pages

### Task Management
- **Create Tasks**: Add new tasks with title, description, priority, due date
- **View Tasks**: See all personal tasks in organized list
- **Update Tasks**: Toggle completion status, edit task details
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Priority Levels**: Visual color coding (Low/Medium/High)
- **Due Dates**: Optional date/time scheduling

### User Experience
- **Responsive Design**: Works on desktop and mobile
- **Toast Notifications**: Real-time feedback for actions
- **Loading States**: Visual indicators during API calls
- **Confirmation Dialogs**: Beautiful modals for critical actions
- **Form Validation**: Client-side input validation

## 🚦 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Application will start on `http://localhost:5173`

## 🐳 Docker Deployment

### With Docker Compose (Recommended)
```bash
# From project root directory
docker-compose up -d

# Frontend will be available at http://localhost:5173
```

### Individual Docker Commands
```bash
# Build frontend image
docker build -t task-frontend .

# Run frontend container
docker run -p 5173:80 task-frontend
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality


