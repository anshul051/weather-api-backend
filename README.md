# Weather API Platform (Production-Grade Backend)

A production-ready Weather API built with **Node.js, Express, Redis, and layered architecture**, designed to demonstrate **real-world backend engineering practices**: caching, rate limiting, API key auth, provider abstraction, graceful degradation, and clean separation of concerns.

This project is intentionally over-engineered for learning and portfolio credibility — mirroring how real backend systems are designed, not toy demos.


## Key Features

- RESTful Weather API
- External provider integration (OpenWeatherMap)
- Redis-based caching (TTL-based)
- API key authentication
- Redis-backed rate limiting
- Graceful Redis failure handling (fail-open)
- Clean layered architecture
- Centralized error handling
- Health monitoring endpoint
- Production-ready middleware design

## Architecture Overview
```text
Client
  → API Key Middleware        (who is calling)
  → Rate Limit Middleware     (how much they can call)
  → Controller                (request/response shaping)
  → Service                   (business logic)
  → Provider                  (external API integration)
  → Redis Cache (read/write)
```

### Why this architecture?
- **Scalability**: Each layer can evolve independently
- **Testability**: Business logic isolated from transport & providers
- **Replaceability**: Weather provider can be swapped without touching routes
- **Production parity**: Mirrors real backend service design


## Folder Structure

```text
src/
├── config/
│   ├── env.js               # Environment loading & validation
│   ├── redis.js             # Redis client (single instance)
│   └── apiKeys.js           # API key store (pluggable)
│
├── constants/
│   └── httpStatus.js        # Centralized HTTP codes
│
├── middlewares/
│   ├── apiKey.middleware.js # Access control
│   ├── rateLimit.middleware.js # Redis-backed throttling
│   ├── notFound.middleware.js
│   └── errorHandler.middleware.js
│
├── routes/
│   ├── health.routes.js     # Public health check
│   └── weather.routes.js    # Protected weather endpoints
│
├── controllers/
│   └── weather.controller.js
│
├── services/
│   └── weather.service.js   # Core business logic
│
├── providers/
│   └── weather.provider.js  # External API adapter
│
├── app.js                   # Express app wiring
└── server.js                # Server bootstrap
```

## Authentication (API Key)

All weather endpoints are protected via an **API key middleware**.

### Why API keys?
- Lightweight authentication for public APIs
- Easy rate limiting per consumer
- Industry standard for service-to-service APIs

### Header Required:
x-api-key: weather_dev_123 

Invalid or missing keys return `401 Unauthorized`.

## Rate Limiting (Redis)

Rate limiting is enforced **per API key** using Redis.

- Window: **60 seconds**
- Max requests: **10 per key**
- Storage: Redis `INCR + EXPIRE`
- Strategy: **Fail-open** (API still works if Redis is down)

### Why Redis-based?
- Distributed-safe
- Shared state across instances
- Industry-standard for API throttling

## Caching Strategy

Weather data is cached using Redis:

- Cache key: `weather:current:{city}:{units}`
- TTL: **5 minutes**
- Cache hit returns instantly
- Cache miss fetches from provider

### Graceful Degradation
If Redis fails:
- Cache is bypassed
- API still serves fresh data
- No downtime

This mirrors **real production resilience patterns**.

## External Provider Abstraction

Weather data is fetched via a **provider layer**.

### Why a provider layer?
- Prevents vendor lock-in
- Normalizes external responses
- Enables easy provider switching
- Keeps services clean

Currently implemented:
- OpenWeatherMap

Future providers can be added without touching routes or controllers.

## Health Check Endpoint
#### ```GET /health```

Returns:
- Server uptime
- Timestamp
- Status

Used by:
- Load balancers
- Monitoring systems
- Kubernetes probes


## API Endpoints

### Get Current Weather
```GET /api/v1/weather/current?city=London&units=metric```

### Headers: 
```x-api-key: weather_dev_123```

### Response: 

Response:
```json
{
  "status": "success",
  "data": {
    "city": "London",
    "units": "metric",
    "temperature": 4.75,
    "condition": "Clouds",
    "source": "openweathermap",
    "cached": true
  },
  "timestamp": "2026-01-11T20:09:54.335Z"
}
```

## Error Handling
Centralized error handling middleware ensures:
- Consistent error responses
- No internal details leaked
- Clean HTTP status codes

## Environment Variables
Create a .env file in server/:
```javascript
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
REDIS_URL=redis://127.0.0.1:6379
```

## Running Locally
### Backend
```
cd server
npm install
npm run dev
```

### Redis (WSL / Linux)
```
redis-server
redis-cli ping
```

## Engineering Decisions (Why This Matters)
This project demonstrates:
- How real APIs are protected
- How caching actually works in production
- How Redis failures are handled safely
- How to design for scale, not demos
- How to structure backend code professionally

This is not **CRUD practice** — this is **backend system design in code.**

## Current Status
- Backend: ✅ Complete
- Frontend dashboard: ⏳ In progress
- Deployment: ⏳ Planned

## License
MIT — use it, extend it, break it, learn from it.