# DjangoPlay — Users App Architecture

**Version:** 1.0.0  
**Date:** 2026-03-27

---

## 1. Overview

The Users app is responsible for identity management and authentication across the system. It manages user accounts, authentication flows, onboarding, verification, password reset, and user-related business logic.

The Users module acts as the identity provider for the entire system and is used by all other modules for authentication and user information.

The Users app is part of the Identity & Access layer of the system architecture.

---

## 2. Responsibilities

The Users app is responsible for:

* User account creation
* Authentication and login
* Signup flow
* Email verification
* Password reset
* User profile management
* User status management
* Login/logout tracking
* Integration with policy engine
* Sending authentication-related emails
* User onboarding flows
* Token generation and validation

The Users app handles authentication, while authorization is handled by the Policy Engine.

---

## 3. App Structure

Typical structure of the Users app:

```
users/
│
├── models.py
├── admin.py
├── apps.py
├── urls.py
├── signals.py
├── tasks.py
│
├── services/
│   ├── signup_service.py
│   ├── login_service.py
│   ├── password_reset_service.py
│   ├── email_verification_service.py
│   ├── user_service.py
│   ├── onboarding_service.py
│   └── token_service.py
│
├── selectors/
│   ├── user_query_service.py
│   └── membership_query_service.py
│
├── policies/
│   └── user_policy.py
│
├── api/
│   └── v1/
│       ├── views.py
│       ├── serializers.py
│       └── urls.py
│
└── tests/
```

---

## 4. User Data Model

Typical models in the Users app include:

| Model              | Purpose                   |
| ------------------ | ------------------------- |
| User               | Core authentication model |
| Employee / Member  | Extended profile          |
| SignUpRequest      | Signup workflow           |
| EmailVerification  | Email verification        |
| PasswordResetToken | Password reset            |
| LoginHistory       | Login tracking            |
| UserToken          | Authentication tokens     |

These models store identity, authentication, and onboarding information.

---

## 5. Authentication Flow

### Login Flow Diagram

```
    User Login Request
          |
          v
      Login View / API
          |
          v
      Login Service
          |
          v
    Authenticate Credentials
          |
          v
  Generate Session / JWT Token
          |
          v
    Audit Log Entry
          |
          v
  Return Authentication Response
```

The login service validates credentials, generates authentication tokens or sessions, logs login activity, and returns the authentication response.

---

## 6. Signup and Onboarding Flow

### Signup Flow Diagram

```
    User Signup Request
            |
            v
        Signup View
            |
            v
      Signup Service
            |
            v
    Create SignUpRequest
            |
            v
    Send Verification Email
            |
            v
    User Verifies Email
            |
            v
    Create User Account
            |
            v
    Onboarding Service
            |
            v
      Audit Log Entry
```

The signup flow ensures email verification before activating user accounts.

---

## 7. Password Reset Flow

### Password Reset Flow Diagram

```
     User Requests Password Reset
              |
              v
        Password Reset Service
              |
              v
        Generate Reset Token
              |
              v
        Send Reset Email
              |
              v
      User Clicks Reset Link
              |
              v
        Validate Token
              |
              v
        Update Password
              |
              v
        Audit Log Entry
```

Password reset tokens are time-limited and validated before updating passwords.

---

## 8. Services Layer

The Users app uses a service-layer architecture.

Typical services include:

| Service                    | Responsibility      |
| -------------------------- | ------------------- |
| Signup Service             | User registration   |
| Login Service              | Authentication      |
| Password Reset Service     | Password reset      |
| Email Verification Service | Verify emails       |
| User Service               | User management     |
| Onboarding Service         | New user onboarding |
| Token Service              | Token generation    |

Services handle business logic, email sending, audit logging, and workflow logic.

---

## 9. Integration with Other Apps

The Users app integrates with multiple modules:

| Module        | Purpose                      |
| ------------- | ---------------------------- |
| Policy Engine | Authorization                |
| Audit         | Logging login/signup actions |
| Mailer        | Sending emails               |
| TeamCentral   | Membership and teams         |
| Helpdesk      | User support                 |
| Invoices      | Invoice ownership            |
| Entities      | Business entities            |
| API Docs      | API logging                  |

The Users module is used by almost all other modules in the system.

---

## 10. Internal Architecture Diagram

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

---

## 11. Design Principles

The Users app follows these principles:

| Principle                      | Description                     |
| ------------------------------ | ------------------------------- |
| Identity Provider              | Central user identity           |
| Service Layer                  | Business logic in services      |
| Email Verification             | Secure signup                   |
| Token Based Flows              | Password reset and verification |
| Audit Logging                  | Login and signup tracking       |
| Integration with Policy Engine | Authorization                   |
| Thin Views                     | Views call services             |
| Background Email Tasks         | Async email sending             |

---

## 12. Summary

The Users app is the identity and authentication module of the system and is a core component of the Identity & Access layer. It manages user accounts, authentication flows, onboarding, password reset, and email verification.

The app follows a service-layer architecture where views call services, services implement business logic, and models handle data persistence. This ensures scalability, maintainability, and clear separation of responsibilities.
