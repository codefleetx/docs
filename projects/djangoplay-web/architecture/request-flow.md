# DjangoPlay — Request Flow Architecture

**Version:** 1.0.0  
**Date:** 2026-03-27

---

## 1. Overview

This document describes how requests flow through the DjangoPlay system,
from the user browser to the database and back to the user.

The system uses the following stack:

Cloudflare → Nginx → Gunicorn → Django → Database / Redis → Response

---

## 2. External Request Flow

High-level request flow:

1. User sends HTTPS request
2. Cloudflare handles SSL and forwards request
3. Nginx receives request
4. Nginx serves static/media OR proxies to Gunicorn
5. Gunicorn runs Django application
6. Django processes request
7. Django queries PostgreSQL / Redis
8. Response returned to Gunicorn
9. Gunicorn → Nginx → Cloudflare → User

---

## 3. Internal Django Request Flow

Inside Django, the request flow typically follows this pattern:

```

URL → View → Serializer/Form → Service → Policy → Model → Database

```

Detailed flow:

1. Request hits URL router
2. URL routes to View
3. View validates request via Serializer/Form
4. View calls Service Layer
5. Service checks Policy Engine for permissions
6. Service performs business logic
7. Service interacts with Models
8. Database query executed
9. Service logs audit event
10. Service may trigger background task
11. Response returned to View
12. View returns HTTP response

---

## 4. Service Layer Flow

Service layer pattern used across the system:

```

View
↓
Serializer
↓
Service
↓
Policy Engine
↓
Model
↓
Database
↓
Audit Log / Tasks / Email

```

Service layer responsibilities:

- Business logic
- Transactions
- Authorization checks
- Audit logging
- Sending emails
- Triggering Celery tasks
- Integration calls

---

## 5. Background Task Flow

Background tasks are handled using Celery.

Flow:

1. Service triggers task
2. Task sent to Redis broker
3. Celery worker receives task
4. Worker executes task
5. Task may send email / call API / process files
6. Result stored or logged

---

## 6. API Request Flow

API request flow:

```

Client → API URL → API View → Serializer → Service → Model → Response JSON

```

API flow steps:

1. API request received
2. Authentication check
3. Permission check via Policy Engine
4. Serializer validation
5. Service execution
6. Database query
7. Response serialized
8. JSON response returned

---

## 7. Summary

The request flow in DjangoPlay follows a layered architecture where requests
flow through routing, views, serializers, services, policies, models, and
database before returning a response.

Background tasks are processed asynchronously using Celery and Redis.
