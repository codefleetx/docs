# DjangoPlay — Core App Architecture

**Version:** 1.0.0  
**Date:** 2026-03-27

---

# 1. Overview

The Core app provides shared functionality, base models, utilities, and common
infrastructure used across all other apps in the system. It acts as a foundational
layer that reduces code duplication and standardizes common behaviors across
domain modules.

The Core app is part of the foundation layer of the system architecture and is
used by most other apps.

---

# 2. Responsibilities

The Core app is responsible for:

- Base model classes
- Soft delete functionality
- Timestamp fields
- Common abstract models
- Shared utilities and helpers
- Common managers and querysets
- Shared constants and enums
- Base service classes (if applicable)
- Shared middleware or mixins
- Common validation utilities
- Shared exception classes
- Common settings or configuration helpers

The Core app should not contain business domain logic.

---

# 3. Why Core App Exists

Without a Core app, shared logic would be duplicated across multiple apps,
leading to inconsistent implementations and maintenance difficulties.

The Core app provides:

| Purpose | Description |
|--------|-------------|
| Reusability | Shared models and utilities |
| Consistency | Standard model behavior |
| Maintainability | Centralized shared logic |
| Standardization | Common patterns across apps |
| Reduced Duplication | Avoid repeated code |
| Shared Infrastructure | Base services and helpers |

The Core app acts as the foundation layer for the entire system.

---

# 4. App Structure

Typical structure of the Core app:

```
core/
│
├── models.py
├── managers.py
├── querysets.py
├── mixins.py
├── services/
├── utils/
├── exceptions.py
├── constants.py
├── validators.py
├── middleware.py
├── signals.py
└── tests/
```

The Core app may also include abstract base models and shared service classes.

---

# 5. Core Models and Shared Components

The Core app typically contains abstract base models such as:

| Model | Purpose |
|------|---------|
| BaseModel | Base model with ID |
| TimeStampedModel | Created and updated timestamps |
| SoftDeleteModel | Soft delete functionality |
| AuditBaseModel | Audit fields |
| ActiveManager | Filter non-deleted records |
| BaseQuerySet | Common queryset logic |

These base models are inherited by models in other apps.

Example inheritance:

```
Invoice → TimeStampedModel → BaseModel
User → SoftDeleteModel → TimeStampedModel → BaseModel
```
This ensures consistent model behavior across the system.

---

# 6. Base Model Architecture

## Base Model Structure Diagram

```
            BaseModel
                |
        ----------------
        |              |

    TimeStamped     SoftDelete
    |                   |
    ------ Combined Base ------
                |
            App Models
                |
            Database
```

Base model features typically include:
- UUID or Auto ID
- created_at
- updated_at
- deleted_at
- is_deleted
- created_by
- updated_by
- Soft delete restore
- Active manager
- Common save logic

This base model architecture standardizes database models across the system.

---

# 7. Integration with Other Apps

The Core app is used by most apps in the system:

| App | Core Usage |
|-----|------------|
| users | Base models |
| invoices | Base models |
| entities | Base models |
| locations | Base models |
| industries | Base models |
| helpdesk | Base models |
| fincore | Base models |
| audit | Base models |
| apidocs | Base models |
| teamcentral | Base models |

Most models in the system inherit from Core base models.

---

# 8. Internal Architecture Diagram

```
    Core Base Models
            |
            v
    Shared Managers / QuerySets
            |
            v
    Shared Utilities / Mixins
            |
            v
    Other Django Apps
            |
            v
        Database
```

The Core app provides foundational components used by domain modules.

---

# 9. Design Principles

The Core app follows these principles:

| Principle | Description |
|----------|-------------|
| Shared Infrastructure | Common functionality |
| Abstract Models | Base model inheritance |
| DRY Principle | Avoid duplication |
| Standardization | Common behavior across apps |
| Foundation Layer | Used by all apps |
| No Business Logic | Only shared infrastructure |
| Reusable Utilities | Common helpers |
| Consistent Model Behavior | Standard fields |

---

# 10. Summary

The Core app provides shared infrastructure, base models, utilities, and common
functionality used across the entire system. It acts as the foundation layer of
the architecture and ensures consistency, reusability, and standardization across
all domain modules.

Most models in the system inherit from Core base models, and many apps use Core
utilities, managers, and shared services.
