# ADR-005 — API Versioning

**Status:** Accepted  
**Date:** 2026-03-27

---

## Context

APIs evolve over time, and changes can break existing clients and integrations.

---

## Decision

The system will use **Versioned APIs**.

API structure:

/api/v1/
/api/v2/

Each version will have:
- Separate URLs
- Separate serializers
- Separate views

This allows API evolution without breaking existing clients.

---

## Consequences

### Advantages
- Backward compatibility
- Safe API evolution
- Easier deprecation
- Supports external integrations

### Disadvantages
- Multiple API versions to maintain

---

## Decision Summary

All APIs must be versioned using /api/v1/, /api/v2/ structure.