# ADR-002 — Service Layer Architecture

**Status:** Accepted  
**Date:** 2026-03-27

---

## Context

Business logic was initially implemented in views and models, which led to
large views, duplicated logic, and difficulty in maintaining workflows.

---

## Decision

Business logic will be implemented in **Service Layer classes** instead of views
or models.

Architecture pattern:

View → Serializer → Service → Model → Database

Services will be responsible for:
- Business logic
- Transactions
- Workflow logic
- Calling policies
- Creating audit logs
- Sending emails
- Triggering background tasks
- Integration calls

Views will remain thin and only handle HTTP requests and responses.

---

## Consequences

### Advantages
- Cleaner views
- Centralized business logic
- Easier testing
- Reusable services
- Better separation of concerns
- Easier maintenance

### Disadvantages
- More files and structure
- Requires consistent architecture discipline

---

## Decision Summary

All business logic should be implemented in services rather than views or models.