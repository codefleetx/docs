# DjangoPlay — TeamCentral App Architecture

**Version:** 1.0.0  
**Date:** 2026-03-27

---

# 1. Overview

The TeamCentral app is responsible for managing teams, organizations, and
membership relationships between users and organizations. It acts as the
organization and team management module of the system.

This module manages which users belong to which organizations or teams and
defines membership roles within organizations.

The TeamCentral app is part of the Identity & Access layer of the system
architecture.

---

# 2. Responsibilities

The TeamCentral app is responsible for:

- Organization management
- Team management
- Membership management
- Assigning users to organizations
- Assigning roles within organizations
- Managing team hierarchy
- Invitations to organizations
- Organization ownership
- Membership status (active, invited, removed)
- Team-based access structure
- Integration with policy engine for access control

This module defines organizational structure and membership relationships.

---

# 3. Why TeamCentral App Exists

In multi-user systems, users often belong to organizations or teams, and access
to resources is often determined based on organization membership.

The TeamCentral app provides:

| Purpose | Description |
|--------|-------------|
| Organization Structure | Manage organizations |
| Team Management | Manage teams within organizations |
| Membership Management | User-organization relationships |
| Role Assignment | Roles within organizations |
| Invitations | Invite users to organizations |
| Ownership | Organization ownership |
| Multi-tenant Structure | Separate organizations |

Without this module, organization and membership logic would be scattered across
multiple apps.

---

# 4. App Structure

Typical structure of the TeamCentral app:

```
teamcentral/
│
├── models.py
├── admin.py
├── apps.py
├── urls.py
├── views.py
├── serializers.py
├── signals.py
├── tasks.py
│
├── services/
│   ├── organization_service.py
│   ├── team_service.py
│   ├── membership_service.py
│   ├── invitation_service.py
│   └── role_service.py
│
├── selectors/
│   ├── organization_query_service.py
│   ├── membership_query_service.py
│   └── team_query_service.py
│
├── policies/
│   └── organization_policy.py
│
└── tests/
```

---

# 5. Team and Membership Model

Typical models in TeamCentral include:

| Model | Purpose |
|------|---------|
| Organization | Organization/company |
| Team | Team within organization |
| Membership | User membership in organization |
| TeamMembership | User membership in team |
| Invitation | Organization invitation |
| Role | Membership role |
| OrganizationSettings | Organization configuration |

Relationships typically look like:

```
User → Membership → Organization
User → TeamMembership → Team → Organization
```

This structure supports multi-tenant architecture.

---

# 6. Membership Management Flow

## Membership Flow Diagram

```
Invite User to Organization
|
v
Invitation Service
|
v
Send Invitation Email
|
v
User Accepts Invitation
|
v
Create Membership
|
v
Assign Role
|
v
Audit Log Entry
```

Membership changes should be handled through services.

---

# 7. Integration with Other Apps

The TeamCentral app integrates with multiple modules:

| Module | Integration |
|--------|-------------|
| Users | User accounts |
| Policy Engine | Access control |
| Audit | Membership change logging |
| Mailer | Invitation emails |
| Entities | Organization entities |
| Invoices | Organization invoices |
| Helpdesk | Organization support |
| Paystream | Organization-level data |

Organization membership is often used for authorization decisions.

---

# 8. Internal Architecture Diagram

```
                API Views / Views
                        |
                        v
                    Serializers
                        |
                        v
                    Services
                        |
            --------------------------
            |                        |
        Selectors               Policies
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
    Audit Log / Tasks / Emails

```

This architecture follows the standard service-layer architecture pattern.

---

# 9. Design Principles

The TeamCentral app follows these principles:

| Principle | Description |
|----------|-------------|
| Multi-tenant Architecture | Organizations and teams |
| Membership-Based Access | Users belong to organizations |
| Role-Based Membership | Roles per organization |
| Service Layer | Business logic in services |
| Audit Logging | Membership changes logged |
| Invitation-Based Access | Controlled organization access |
| Integration with Policy Engine | Authorization |
| Separation of Teams and Users | Flexible organization structure |

---

# 10. Summary

The TeamCentral app manages organizations, teams, memberships, and roles within
organizations. It supports multi-tenant architecture and defines the relationship
between users and organizations.

This module is part of the Identity & Access layer and integrates with the Users
app for identity and the Policy Engine for authorization.

The app follows a service-layer architecture and manages organization structure,
team membership, invitations, and role assignments.
