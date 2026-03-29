
# DjangoPlay API — Issues

**Version:** v1

---

## Overview

This document describes the Issue Tracker API endpoints used for
issue tracking integration.

---

## Endpoints

### List Issues
```
GET /api/v1/issues/
```
---

### Create Issue

```
POST /api/v1/issues/
```
Request:
```
{
"title": "Bug in invoice",
"description": "Invoice calculation incorrect",
"priority": "HIGH"
}
```
---

### Get Issue
```
GET /api/v1/issues/{id}/
```
---

### Update Issue
```
PUT /api/v1/issues/{id}/
```
---

### Change Status
```
POST /api/v1/issues/{id}/status/
```
---

### Add Comment
```
POST /api/v1/issues/{id}/comments/
```
---

### Sync Issue
```
POST /api/v1/issues/{id}/sync/
```
This syncs the issue with external issue tracker.

---

## Issue Status

| Status | Description |
|--------|-------------|
| OPEN | Open issue |
| IN_PROGRESS | Being worked |
| RESOLVED | Fixed |
| CLOSED | Closed |
| REOPENED | Reopened |

---

## Notes

Issues may be linked to:
- Helpdesk tickets
- Entities
- Invoices
- Users
- External issue tracker
