# DjangoPlay — Standard Django App Architecture Pattern

**Version:** 1.0.0  
**Date:** 2026-03-27

---

## 1. Overview

Each Django app in the system represents a **domain module** and follows a consistent internal architecture pattern. The goal of this pattern is to separate responsibilities such as views, business logic, data access, permissions, and background processing.

This architecture ensures:

* Thin views
* Business logic in services
* Centralized permission handling
* Reusable query logic
* Event-driven signals
* Background task processing
* Clean separation of concerns

---

## 2. Typical App Structure

A typical Django app follows this structure:

```text
app_name/
│
├── models.py
├── admin.py
├── apps.py
├── urls.py
├── views.py
├── serializers.py
├── permissions.py
├── signals.py
├── tasks.py
├── tests/
│
├── services/
│   ├── __init__.py
│   ├── create_service.py
│   ├── update_service.py
│   ├── delete_service.py
│   ├── workflow_service.py
│   └── helpers.py
│
├── selectors/
│   ├── __init__.py
│   ├── query_service.py
│   └── filters.py
│
├── policies/
│   ├── __init__.py
│   └── access_policy.py
│
└── utils/
```

Not every app must contain all folders, but most domain apps follow this pattern.

---

## 3. Internal Architecture Diagram

```text
        Views / API
            |
            v
        Serializers
            |
            v
        Services
            |
    ----------------
    |              |
 Selectors       Policies
    |
    v
  Models
    |
    v
  Database
    |
    v
  Signals
    |
    v
  Audit Log
    |
    v
  Celery Tasks
```

---

## 4. Responsibilities of Each Component

### 4.1 Models

Models represent database tables and should contain:

* Fields
* Relationships
* Basic validation
* Simple helper methods
* Soft delete logic
* Timestamps
* Status fields

Models should **NOT** contain complex business logic.

---

### 4.2 Views / API Views

Views are responsible for:

* Receiving HTTP requests
* Validating request data
* Calling services
* Returning responses

Views should be **thin** and should not contain business logic.

Example flow:

```text
Request → View → Service → Response
```

---

### 4.3 Serializers

Serializers handle:

* Input validation
* Output formatting
* Data transformation
* Nested objects handling

Serializers should not contain business logic.

---

### 4.4 Services (Business Logic Layer)

Services are the most important part of the application architecture.

Services handle:

* Business rules
* Transactions
* Workflow logic
* Calling models
* Calling selectors
* Calling external services
* Triggering tasks
* Writing audit logs

Example responsibilities:

* Create object
* Update object
* Change status
* Perform workflow transitions
* Send notifications
* Validate business rules

Views should always call services instead of directly interacting with models.

---

### 4.5 Selectors / Query Services

Selectors are responsible for:

* Complex queries
* Filtering logic
* List views
* Optimized queries
* Query reuse

Selectors help keep query logic out of views and services.

Example:

```python
IssueQueryService.get_issues_for_user(user)
InvoiceQueryService.get_unpaid_invoices()
```

---

### 4.6 Policies / Permissions

Policies define access rules such as:

* Who can view
* Who can create
* Who can update
* Who can delete
* Role-based access
* Ownership checks
* Organization-based access

Policies are used by services and views to enforce authorization.

---

### 4.7 Signals

Signals are used for event-driven operations such as:

* Creating audit logs
* Sending notifications
* Updating related objects
* Logging events
* Triggering background tasks

Signals should not contain heavy logic; they should call services or tasks.

---

### 4.8 Tasks (Celery)

Tasks are used for background operations such as:

* Sending emails
* Generating reports
* Processing files
* Calling external APIs
* Long running jobs

Tasks should be triggered from services or signals.

---

## 5. Standard Request Flow Inside an App

```text
Client Request
|
v
URL Router
|
v
View / API View
|
v
Serializer
|
v
Service Layer
|
v
Policy Check
|
v
Selector / Query
|
v
Model
|
v
Database
|
v
Signals
|
v
Audit Log / Tasks / Notifications
|
v
Response
```

---

## 6. Design Principles Used

| Principle              | Description                           |
| ---------------------- | ------------------------------------- |
| Thin Views             | Views only handle HTTP logic          |
| Service Layer          | Business logic in services            |
| Domain Isolation       | Each app owns its domain              |
| Separation of Concerns | Queries, logic, permissions separated |
| Event Driven           | Signals for events                    |
| Background Processing  | Celery tasks                          |
| Audit Logging          | System actions logged                 |
| Policy Based Access    | Authorization handled via policies    |
| Reusable Queries       | Selectors for query logic             |
| Modular Architecture   | Apps act as modules                   |

---

### Benefits

Advantages of this architecture:

1. Clean code organization
2. Easier testing
3. Reusable business logic
4. Reusable query logic
5. Clear permission handling
6. Easier maintenance
7. Easier onboarding for developers
8. Supports large codebases
9. Encourages domain separation
10. Production friendly architecture

---

# 7. API Versioning and Routing Architecture

## Overview

The system uses a **versioned API architecture** to ensure backward compatibility and allow evolution of APIs without breaking existing clients.

* APIs are versioned using URL namespaces such as `/api/v1/`, `/api/v2/`, etc.
* Each API version can have its own **views**, **serializers**, and **URL routing**.
* This approach allows the system to introduce new API behavior while keeping older API versions stable.

---

## URL Structure

Typical API URL structure:

```text
/api/v1/users/
/api/v1/issues/
/api/v1/invoices/
/api/v1/audit/
/api/v1/integrations/
```

* The **version** is included in the URL path and mapped to **version-specific views**.

---

## Versioned URL Routing Pattern

Project URL structure typically follows:

```text
project/
├── urls.py
└── api/
    ├── v1/
    │   └── urls.py
    └── v2/
        └── urls.py
```

Example routing:

```text
/api/v1/ → api.v1.urls
/api/v2/ → api.v2.urls
```

* Each version has its **own URL configuration**.

---

## Versioned Views Pattern

Views are versioned by placing them inside versioned modules:

```text
app/
└── api/
    ├── v1/
    │   └── views.py
    └── v2/
        └── views.py
```

* This allows **different API behavior per version** without affecting older versions.

---

## Versioned Serializers Pattern

Serializers are also versioned to support different API response formats:

```text
app/
└── api/
    ├── v1/
    │   └── serializers.py
    └── v2/
        └── serializers.py
```

Benefits:

* Add new fields in newer API versions
* Deprecate fields in older versions
* Different validation logic
* Different response structures

---

## Versioned API Architecture Diagram

```text
Client Request
|
v
/api/v1/...  →  api.v1.urls
|
v
v1 Views
|
v
v1 Serializers
|
v
Services
|
v
Models
|
v
Database
```

---

## Benefits of API Versioning

Advantages of versioned API architecture:

1. Backward compatibility
2. Safe API evolution
3. Ability to deprecate old APIs gradually
4. Support multiple client versions
5. Cleaner API change management
6. Avoid breaking existing integrations
7. Easier migration between API versions

---

## Versioning Strategy

Typical versioning strategy:

| Version | Purpose                    |
| ------- | -------------------------- |
| v1      | Initial stable API         |
| v2      | Improved API structure     |
| v3      | Major architecture changes |
| Legacy  | Deprecated endpoints       |

* Older versions remain supported for a defined deprecation period.

---

# 8. Django Architecture Pattern Summary

Each Django app acts as a **domain module** and follows a structured internal architecture consisting of:

| Area                | Pattern Used               |
| ------------------- | -------------------------- |
| System Architecture | Modular Monolith           |
| Code Architecture   | Layered Architecture       |
| Business Logic      | Service Layer Pattern      |
| Authorization       | Policy Engine              |
| Logging             | Audit Logging              |
| Background Jobs     | Celery Tasks               |
| Events              | Signals                    |
| Queries             | Selectors / Query Services |
| API                 | Versioned API              |
| Routing             | Namespaced URL Routing     |
| Apps                | Domain Modules             |
| Deployment          | Nginx + Gunicorn           |
| Database            | PostgreSQL                 |
| Cache               | Redis                      |
