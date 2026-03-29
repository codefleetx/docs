# Authentication API Documentation

**Project:** DjangoPlay Web
**Document Type:** API Documentation
**Last Updated:** 2026-03-28
**Version:** 1.0

---

# 1. Overview

The Authentication system handles:

* User login
* User logout
* Password reset
* Email verification
* Resend verification email
* Session authentication
* Token authentication
* SSO login
* Account activation
* Authentication throttling

Authentication is implemented using Django authentication system and Django REST Framework.

---

# 2. Authentication Methods

The system supports multiple authentication methods:

| Method                 | Description              |
| ---------------------- | ------------------------ |
| Session Authentication | Browser login            |
| Token Authentication   | API access               |
| SSO Authentication     | Google / SSO login       |
| Email Verification     | Account activation       |
| Password Reset         | Reset forgotten password |

---

# 3. Login API

## Endpoint

```
POST /api/v1/auth/login/
```

## Request Body

```
{
    "email": "user@example.com",
    "password": "password"
}
```

## Response

```
{
    "message": "Login successful",
    "user_id": 1,
    "email": "user@example.com"
}
```

## Errors

| Status | Description         |
| ------ | ------------------- |
| 400    | Invalid credentials |
| 403    | Email not verified  |
| 429    | Too many attempts   |

---

# 4. Logout API

## Endpoint

```
POST /api/v1/auth/logout/
```

## Description

Logs out the current user and invalidates session.

---

# 5. Password Reset

## Request Password Reset

```
POST /api/v1/auth/password-reset/
```

Request:

```
{
    "email": "user@example.com"
}
```

User receives email with reset link.

## Confirm Password Reset

```
POST /api/v1/auth/password-reset-confirm/
```

Request:

```
{
    "token": "reset_token",
    "new_password": "new_password"
}
```

---

# 6. Email Verification

## Verify Email

```
GET /api/v1/auth/verify-email/?token=<token>
```

Activates user account after signup.

---

# 7. Resend Verification Email

```
POST /api/v1/auth/resend-verification/
```

Request:

```
{
    "email": "user@example.com"
}
```

---

# 8. Token Authentication

Token authentication is used for API clients.

Clients must send token in header:

```
Authorization: Token <token>
```

---

# 9. Session Authentication

Session authentication is used for browser login.

Session cookie is stored after login.

---

# 10. SSO Authentication

SSO login flow:

1. User clicks "Sign in with Google"
2. Redirect to Google OAuth
3. Google returns authorization code
4. System logs user in or creates account
5. User redirected to dashboard

---

# 11. Error Responses

Standard error response format:

```
{
    "error": "error_code",
    "message": "Error description"
}
```

Common errors:

| Error               | Description             |
| ------------------- | ----------------------- |
| invalid_credentials | Wrong email or password |
| email_not_verified  | Email not verified      |
| account_disabled    | Account disabled        |
| token_expired       | Token expired           |
| invalid_token       | Invalid token           |

---

# 12. Rate Limiting

Authentication endpoints are rate limited to prevent brute force attacks.

| Endpoint            | Limit               |
| ------------------- | ------------------- |
| login               | 5 attempts / minute |
| password reset      | 3 requests / hour   |
| resend verification | 3 requests / hour   |

---

# 13. Security Notes

Security measures implemented:

* Password hashing
* Email verification required
* Rate limiting
* CSRF protection
* Session expiration
* Secure cookies
* HTTPS required in production
* Token expiration
* Audit logging for login/logout

---

# End of Document
