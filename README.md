# UniEvents

A platform for university students to discover and RSVP to campus events.

## Tech Stack

**Frontend:**
- Vue 3 (Composition API)
- Vite
- TailwindCSS
- Pinia
- Vue Router
- Vitest

**Backend:**
- Golang
- PostgreSQL
- Docker & Docker Compose

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Go 1.21+
- Node.js 18+

### Quick Start

1. Install dependencies:
```bash
make init
```

2. Start all services:
```bash
make up
```

3. View logs:
```bash
make logs
```

4. Stop all services:
```bash
make down
```

### Services

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8083
- **PostgreSQL**: localhost:5431

### Project Structure

```
.
├── frontend/        # Vue 3 frontend
├── backend/         # Go backend
├── docker-compose.yml
└── Makefile
```

## Development

This is a skeleton project. Business logic and UI components need to be implemented by the team.
