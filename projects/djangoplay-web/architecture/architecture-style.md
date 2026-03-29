# DjangoPlay — Architecture Style

**Version:** 1.0.0  
**Date:** 2026-03-27

---

# 1. Overview

The system follows a modular monolithic architecture with layered design,
service layer pattern, centralized authorization, audit logging, versioned APIs,
and background task processing.

The architecture evolved over time and was gradually structured into a
domain-oriented modular system where each Django app represents a domain module.

This architecture is designed to support long-term maintainability, scalability,
and clear separation of responsibilities across the system.

---

# 2. Architecture Type

The system architecture can be classified as:

| Category | Architecture |
|---------|--------------|
| System Architecture | Modular Monolith |
| Application Architecture | Layered Architecture |
| Business Logic | Service Layer Pattern |
| Authorization | Policy Engine |
| Logging | Audit Logging |
| API | Versioned API |
| Background Jobs | Celery Task Queue |
| Integrations | Integration Layer |
| Deployment | Nginx + Gunicorn |
| Database | PostgreSQL |
| Cache / Broker | Redis |

---

# 3. Modular Monolith Architecture

The system is implemented as a modular monolith where multiple domain modules
exist within a single Django project and share a common database and deployment.

```
Django Project
│
├── core
├── utilities
├── users
├── policyengine
├── audit
├── invoices
├── entities
├── locations
├── industries
├── helpdesk
├── teamcentral
├── fincore
├── mailer
├── apidocs
├── frontend
└── integrations
```

Each module:
- Owns its models
- Contains its own services
- Contains its own business logic
- Communicates with other modules through services
- Avoids direct cross-module model access when possible

This architecture allows the system to grow in complexity while remaining
maintainable and deployable as a single system.

---

# 4. Layered Architecture

The application follows a layered architecture separating presentation,
business logic, domain models, and infrastructure.

```
Presentation Layer
Views / API Views / Templates
|
Application Layer
Services / Business Logic
|
Domain Layer
Models / Policies / Domain Rules
|
Infrastructure Layer
Database / Redis / Celery / Email / Integrations
```

This separation ensures that business logic is not tightly coupled with views
or database logic.

---

# 5. Service Layer Pattern

The system follows a service layer architecture where business logic is placed
in service classes instead of views or models.

```
View → Serializer → Service → Model → Database
```

Services are responsible for:
- Business logic
- Transactions
- Workflow logic
- Calling policies
- Creating audit logs
- Triggering background tasks
- Sending emails
- Calling integrations

Views should remain thin and only handle HTTP requests and responses.

---

# 6. Domain Driven Structure

Each Django app represents a domain module with its own responsibility.

Examples:

| App | Domain |
|-----|-------|
| users | Identity and authentication |
| policyengine | Authorization |
| audit | Audit logging |
| invoices | Billing and invoices |
| entities | Business entities |
| locations | Location data |
| industries | Industry classification |
| helpdesk | Support and helpdesk |
| fincore | Financial core |
| teamcentral | Teams and organizations |
| mailer | Email services |
| apidocs | API logging and documentation |
| frontend | Frontend flows |

This structure follows a lightweight domain-driven design approach.

---

# 7. Policy Based Authorization

Authorization is centralized in the Policy Engine rather than being implemented
directly in views or services.

```
Service → Policy Engine → Allow / Deny
```

Policies evaluate permissions based on:
- User role
- Ownership
- Organization membership
- Role hierarchy
- Action being performed

This ensures consistent authorization across the system.

---

# 8. Audit Logging Architecture

All important system actions are recorded in the Audit module.

Audit logs include:
- Create
- Update
- Delete
- Status changes
- Login / Logout
- Administrative actions
- System actions

Audit logs are typically created from services or signals.

```
Service → Audit Service → Audit Log → Database
```

---

# 9. API Versioning Architecture

The system uses versioned APIs to maintain backward compatibility.

```
/api/v1/
/api/v2/
```

Each version has its own:
- URLs
- Views
- Serializers

```
api/
v1/
views.py
serializers.py
urls.py
v2/
views.py
serializers.py
urls.py
```

This allows the API to evolve without breaking existing clients.

---

# 10. Background Task Architecture

Background processing is handled using Celery and Redis.

Background tasks include:
- Sending emails
- Generating reports
- Processing files
- Calling external APIs
- Long running jobs

```
Service → Celery Task → Redis → Worker → External Service
```

---

# 11. Integration Architecture

External systems are integrated through a dedicated integrations layer.

```
Main App → Integration Service → External System
```

Examples:
- Issue tracker integration
- Email providers
- OAuth providers
- External APIs

This prevents external API logic from being scattered across modules.

---

# 12. App Layer Classification

The Django apps can be grouped into logical layers:

## Foundation Layer
- core
- utilities
- mailer

## Identity & Access Layer
- users
- teamcentral
- policyengine

## Master Data Layer
- locations
- industries
- entities (companies)

## Business Domain Layer
- fincore
- invoices
- helpdesk
- paystream

## Infrastructure Layer
- audit
- apidocs

## Presentation Layer
- frontend

## Integration Layer
- issuetracker integration

This layered module structure improves system organization and maintainability.

---

# 13. Design Principles

The system follows these design principles:

| Principle | Description |
|----------|-------------|
| Modular Architecture | Apps act as modules |
| Separation of Concerns | Logic separated into layers |
| Thin Views | Views handle HTTP only |
| Service Layer | Business logic in services |
| Centralized Authorization | Policy engine |
| Audit Logging | Track system actions |
| Versioned APIs | Backward compatibility |
| Background Tasks | Async processing |
| Domain Isolation | Apps represent domains |
| Reusable Query Logic | Selectors |
| Event Driven | Signals |
| Scalable Architecture | Supports growth |

---

# 14. Summary

The system architecture is a modular monolith with layered architecture,
service layer pattern, centralized authorization, audit logging, versioned APIs,
background processing, and integration modules.

Each Django app represents a domain module and follows a consistent internal
architecture pattern. The architecture is designed for maintainability,
scalability, and clear separation of responsibilities across the system.
