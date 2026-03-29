# ADR-003 — Policy Engine Authorization

**Status:** Accepted  
**Date:** 2026-03-27

---

## Context

Authorization logic was previously implemented in views and services,
leading to duplicated permission checks and inconsistent authorization behavior.

---

## Decision

Authorization logic will be centralized in a **Policy Engine**.

Architecture pattern:

Service → Policy Engine → Allow / Deny

Policies evaluate:
- User role
- Ownership
- Organization membership
- Role hierarchy
- Action being performed

---

## Consequences

### Advantages
- Centralized authorization logic
- Consistent permission checks
- Easier role hierarchy implementation
- Easier auditing and debugging
- Reusable policies across modules

### Disadvantages
- Additional abstraction layer
- Developers must remember to call policies

---

## Decision Summary

Authorization logic must be implemented through the policy engine,
not directly in views or services.