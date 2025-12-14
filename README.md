# UniEvents 🎓

**A platform for university students to discover and RSVP to campus events.**

UniEvents helps students stay connected with campus life by providing a centralized place to browse upcoming events, view event details, and manage RSVPs. Whether it's a tech talk, career fair, or social gathering, students can easily find and participate in events that matter to them.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How to Run](#-how-to-run)
- [Troubleshooting](#-troubleshooting)

---

## 🛠 Tech Stack

### Frontend
- **Vue 3** (Composition API) - Progressive JavaScript framework
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Vitest** - Unit testing framework

### Backend
- **Go (Golang)** - Backend programming language
- **PostgreSQL** - Relational database
- **Gorilla Mux** - HTTP router
- **Docker & Docker Compose** - Containerization

---

## 📁 Project Structure

```
Vue-Final/
├── frontend/              # Vue 3 application
│   ├── src/
│   │   ├── views/        # Page components
│   │   ├── router/       # Route definitions
│   │   ├── stores/       # Pinia state management
│   │   └── composables/  # Reusable composition functions
│   └── README.md         # Frontend documentation
│
├── backend/              # Go API server
│   ├── main.go          # Server entry point
│   ├── handlers/        # HTTP request handlers
│   ├── models/          # Data models
│   ├── init.sql         # Database initialization
│   └── README.md        # Backend documentation
│
├── docker-compose.yml   # Docker services configuration
├── Makefile            # Convenient commands
└── README.md           # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have these installed:

1. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
   - Includes Docker and Docker Compose
   - Required for running the database and services

2. **Node.js (v18 or higher)** - [Download here](https://nodejs.org/)
   - Required for frontend development
   - Check version: `node --version`

3. **Go (v1.21 or higher)** - [Download here](https://go.dev/dl/)
   - Required for backend development
   - Check version: `go version`

### First-Time Setup

Follow these steps **only once** when setting up the project:

#### Step 1: Clone the Repository
```bash
# If you haven't already
cd /path/to/your/projects
git clone <repository-url>
cd Vue-Final
```

#### Step 2: Install Dependencies
```bash
make init
```

This command will:
- Install Go modules for the backend
- Install npm packages for the frontend

**Expected output:**
```
Installing backend dependencies...
Installing frontend dependencies...
Dependencies installed successfully!
```

---

## 🏃 How to Run

### Starting the Application

**Option 1: Start Everything (Recommended)**
```bash
make up
```

This starts all services:
- PostgreSQL database (port 5431)
- Backend API server (port 8083)
- Frontend dev server (port 5173)

**Wait 10-15 seconds** for all services to start, then open:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8083/api/events

### Viewing Logs

To see what's happening in the services:
```bash
make logs
```

Press `Ctrl+C` to stop viewing logs (services keep running).

### Stopping the Application

```bash
make down
```

This stops all running services.

---

## 🔧 Development Workflow

### Making Changes

1. **Frontend changes**: Edit files in `frontend/src/`
   - Vite will auto-reload your browser
   - See `frontend/README.md` for details

2. **Backend changes**: Edit files in `backend/`
   - Restart the server: `docker-compose restart server`
   - See `backend/README.md` for details

### Running Tests

**Frontend tests:**
```bash
cd frontend
npm test
```

### Accessing the Database

If you need to access PostgreSQL directly:
```bash
docker exec -it unievents-postgres psql -U postgres -d unievents
```

---

## 🐛 Troubleshooting

### Port Already in Use

If you see "port already in use" errors:

```bash
# Stop all services
make down

# Check what's using the ports
lsof -i :5173  # Frontend
lsof -i :8083  # Backend
lsof -i :5431  # Database

# Kill the process if needed
kill -9 <PID>
```

### Docker Issues

If Docker services won't start:

```bash
# Stop everything
make down

# Remove volumes and start fresh
docker-compose down -v
make up
```

### Dependencies Not Installing

```bash
# Clean everything
make clean

# Reinstall
make init
```

### Frontend Not Loading

1. Check if Vite is running: `docker-compose logs client`
2. Make sure port 5173 is not blocked
3. Try accessing http://localhost:5173 in an incognito window

### Backend Not Responding

1. Check server logs: `docker-compose logs server`
2. Verify database is running: `docker-compose ps`
3. Rebuild the server: `docker-compose up -d --build server`

---

## 📚 Additional Documentation

- **Frontend Details**: See `frontend/README.md`
- **Backend Details**: See `backend/README.md`

---

## 👥 Team Development

### For New Team Members

1. Make sure you have all [prerequisites](#prerequisites) installed
2. Run `make init` to install dependencies
3. Run `make up` to start the application
4. Open http://localhost:5173 in your browser
5. Start coding! 🎉

### Useful Commands

| Command | Description |
|---------|-------------|
| `make init` | Install all dependencies |
| `make up` | Start all services |
| `make down` | Stop all services |
| `make logs` | View service logs |
| `make clean` | Remove all dependencies and volumes |

---

## 📝 Notes

- This is a **skeleton project** - business logic needs to be implemented
- The database automatically initializes with sample event data
- CORS is configured to allow frontend-backend communication
- All services run in Docker containers for consistency

---

**Happy Coding! 🚀**
