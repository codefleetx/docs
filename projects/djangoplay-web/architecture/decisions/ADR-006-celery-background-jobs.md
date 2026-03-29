# ADR-006 — Background Jobs with Celery

**Status:** Accepted  
**Date:** 2026-03-27

---

## Context

Some tasks are long-running or should not block HTTP requests, such as:
- Sending emails
- Generating reports
- External API calls
- File processing
- Synchronization tasks

---

## Decision

Background tasks will be processed using **Celery with Redis**.

Architecture:

Service → Celery Task → Redis → Worker → Task Execution

---

## Consequences

### Advantages
- Non-blocking operations
- Better performance
- Retry mechanisms
- Scheduled jobs
- Scalable task processing

### Disadvantages
- Additional infrastructure (Redis, Workers)
- Task monitoring required

---

## Decision Summary

Long-running and asynchronous tasks must be processed via Celery background workers.