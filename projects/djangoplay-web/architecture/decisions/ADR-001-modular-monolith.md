# ADR-001 — Modular Monolith Architecture

**Status:** Accepted  
**Date:** 2026-03-27

---

## Context

The system needed to support multiple business domains such as users,
organizations, entities, invoices, finance, helpdesk, integrations, and APIs.
The architecture needed to support modular development while keeping deployment
and operational complexity manageable.

---

## Decision

The system will use a **Modular Monolith Architecture** where:

- Each Django app represents a domain module
- Modules are logically separated
- All modules share the same database
- The system is deployed as a single application
- Modules communicate via services, not direct coupling

---

## Consequences

### Advantages
- Easier deployment than microservices
- Clear module boundaries
- Easier refactoring
- Shared database transactions
- Lower infrastructure complexity
- Faster development

### Disadvantages
- Requires discipline to maintain module boundaries
- Entire system deploys together
- Scaling is application-level, not service-level

---

## Alternatives Considered

| Architecture | Reason Rejected |
|--------------|----------------|
| Monolithic (single app) | Too unstructured |
| Microservices | Too complex for current scale |
| Service-Oriented | Operational complexity |

---

## Decision Summary

The modular monolith provides a balance between maintainability,
scalability, and operational simplicity.