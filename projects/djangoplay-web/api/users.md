# DjangoPlay API — Users

**Version:** v1

---

## Overview

This document describes the Users API endpoints.

---

## Authentication

Most endpoints require authentication.

Authentication methods:
- Session authentication
- Token authentication
- JWT (if enabled)

---

## Endpoints

### Login
```
POST /api/v1/users/login/
```
Request:
```
{
"username": "user",
"password": "password"
}
```

Response:
```
{
"message": "Login successful"
}
```

---

### Logout
```
POST /api/v1/users/logout/
```
---

### Register User
```
POST /api/v1/users/register/
```
---

### Get Current User
```
GET /api/v1/users/me/
```
---

### Update User
```
PUT /api/v1/users/me/
```
---

### Change Password
```
POST /api/v1/users/change-password/
```
---

### Password Reset
```
POST /api/v1/users/password-reset/
```
---

### Email Verification
```
POST /api/v1/users/verify-email/
```
---

## User Roles

| Role | Description |
|------|-------------|
| Superuser | Full access |
| Admin | Organization admin |
| Manager | Manager |
| Auditor | Read-only |
| Accountant | Finance |
| Clerk | Basic access |

---

## Notes

Authorization is handled via Policy Engine.
