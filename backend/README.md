# Backend - UniEvents API 🔧

Go-based REST API server for the UniEvents platform.

---

## 📋 Overview

The backend provides a RESTful API for managing campus events. It connects to a PostgreSQL database and serves data to the frontend application.

**Base URL**: `http://localhost:8083`

---

## 🏗 Architecture

```
backend/
├── main.go              # Server entry point, DB connection, routing
├── handlers/            # HTTP request handlers
│   └── events.go       # Event-related endpoints
├── models/             # Data structures
│   └── event.go        # Event model
├── init.sql            # Database schema and sample data
├── go.mod              # Go module dependencies
├── go.sum              # Dependency checksums
└── Dockerfile          # Docker container configuration
```

---

## 🗄 Database

### Schema

**Events Table:**
```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data

The database automatically initializes with **12 sample campus events** when the server starts:

- Welcome Week Kickoff
- Tech Talk: AI in Education
- Campus Job Fair
- Movie Night: Inception
- Hackathon 2025
- Spring Concert Series
- Career Workshop: Resume Building
- International Food Festival
- Guest Lecture: Climate Change
- Spring Break Volunteer Day
- Gaming Tournament
- Study Abroad Info Session

**Note**: The database is initialized from `init.sql` on first run. If you need to reset the data, stop the services and remove the database volume:

```bash
docker-compose down -v
docker-compose up -d
```

---

## 🛣 API Endpoints

### Get All Events

**GET** `/api/events`

Returns a list of all campus events, ordered by date (ascending).

**Response:**
```json
[
  {
    "id": 1,
    "title": "Welcome Week Kickoff",
    "date": "2025-01-15T18:00:00Z",
    "description": "Join us for the official start of Welcome Week! Meet new students, enjoy free food, and learn about campus resources."
  },
  {
    "id": 2,
    "title": "Tech Talk: AI in Education",
    "date": "2025-01-20T14:00:00Z",
    "description": "Guest speaker from Google will discuss the future of AI in educational technology. Q&A session included."
  }
  // ... more events
]
```

**Example:**
```bash
curl http://localhost:8083/api/events
```

---

## 🔧 Development

### Running Locally (Without Docker)

1. **Start PostgreSQL:**
   ```bash
   docker-compose up -d postgres
   ```

2. **Run the server:**
   ```bash
   cd backend
   go run main.go
   ```

3. **Access the API:**
   - http://localhost:8083/api/events

### Adding Dependencies

```bash
cd backend
go get <package-name>
go mod tidy
```

### Making Changes

1. Edit the code in `backend/`
2. Restart the server:
   ```bash
   docker-compose restart server
   ```

### Adding New Endpoints

1. Create handler function in `handlers/` directory
2. Register route in `main.go`:
   ```go
   router.HandleFunc("/api/your-endpoint", appHandlers.YourHandler).Methods("GET")
   ```

---

## 📦 Dependencies

- **gorilla/mux** - HTTP router and URL matcher
- **gorilla/handlers** - CORS middleware
- **lib/pq** - PostgreSQL driver

---

## 🔐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgres://postgres:postgres@localhost:5431/unievents?sslmode=disable` | PostgreSQL connection string |
| `PORT` | `8083` | Server port |

---

## 🌐 CORS Configuration

The server is configured to accept requests from:
- `http://localhost:5173` (Frontend dev server)
- `http://localhost:5174` (Alternative port)

Allowed methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

---

## 🧪 Testing the API

### Using curl

```bash
# Get all events
curl http://localhost:8083/api/events

# Pretty print with jq
curl http://localhost:8083/api/events | jq
```

### Using Browser

Simply visit: http://localhost:8083/api/events

---

## 🐛 Troubleshooting

### Server Won't Start

**Check logs:**
```bash
docker-compose logs server
```

**Common issues:**
- Database not ready: Wait a few seconds and try again
- Port 8083 in use: Stop other services using that port
- Go module errors: Run `go mod tidy` in the backend directory

### Database Connection Failed

**Verify PostgreSQL is running:**
```bash
docker-compose ps postgres
```

**Check database logs:**
```bash
docker-compose logs postgres
```

### Changes Not Reflecting

**Rebuild the container:**
```bash
docker-compose up -d --build server
```

---

## 📝 Code Structure

### main.go

- Database connection setup
- HTTP server initialization
- Route registration
- Database initialization (creates tables and seeds data)

### handlers/events.go

- `GetEvents()` - Fetches all events from database

### models/event.go

- `Event` struct - Represents an event with JSON tags

---

## 🚀 Next Steps for Development

**TODO items for your team:**

1. **Add more endpoints:**
   - `POST /api/events` - Create new event
   - `GET /api/events/:id` - Get single event
   - `PUT /api/events/:id` - Update event
   - `DELETE /api/events/:id` - Delete event
   - `POST /api/events/:id/rsvp` - RSVP to event

2. **Add authentication:**
   - User login/registration
   - JWT tokens
   - Protected routes

3. **Add more models:**
   - User model
   - RSVP model
   - Category model

4. **Add validation:**
   - Input validation
   - Error handling
   - Request validation middleware

---

**Happy Backend Development! 🔧**
