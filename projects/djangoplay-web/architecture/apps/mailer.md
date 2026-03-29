# DjangoPlay — Mailer App Architecture

**Version:** 1.0.0  
**Date:** 2026-03-27

---

# 1. Overview

The Mailer app is responsible for sending emails across the system. It provides
a centralized email service used by multiple apps such as users, helpdesk,
invoices, and integrations.

The Mailer app centralizes email sending logic, template rendering, email
queueing, and notification delivery.

The Mailer module is part of the foundation layer and infrastructure layer of
the system architecture.

---

# 2. Responsibilities

The Mailer app is responsible for:

- Sending system emails
- Email template rendering
- Email notifications
- Signup emails
- Password reset emails
- Verification emails
- Helpdesk emails
- Invoice emails
- System notifications
- Email queueing using background tasks
- Email logging (if implemented)
- Email retry logic
- Email unsubscribe handling (if implemented)

The Mailer app should be the only module responsible for sending emails.

---

# 3. Why Mailer App Exists

Without a centralized mailer system, email sending logic would be scattered
across multiple apps, leading to duplication and inconsistent email handling.

The Mailer app provides:

| Purpose | Description |
|--------|-------------|
| Centralized Email Logic | All emails handled in one place |
| Template Management | Email templates centralized |
| Background Sending | Async email sending |
| Reusability | Email service used by multiple apps |
| Logging | Email tracking |
| Retry Logic | Failed email retries |
| Unsubscribe Handling | Email preferences |

This ensures consistent email delivery across the system.

---

# 4. App Structure

Typical structure of the Mailer app:

```
mailer/
│
├── services/
│   ├── email_service.py
│   ├── template_service.py
│   ├── notification_service.py
│   └── unsubscribe_service.py
│
├── tasks.py
├── templates/
│   └── emails/
│
├── models.py
├── signals.py
├── utils.py
├── constants.py
└── tests/
```

The Mailer app typically contains email templates, email services, and background
tasks for sending emails asynchronously.

---

# 5. Email Sending Flow

## Email Sending Flow Diagram

```
Service (Users / Invoices / Helpdesk)
    |
    v
Mailer Service
    |
    v
Render Email Template
    |
    v
Celery Task
    |
    v
Email Provider
    |
    v
Recipient
```

Email sending is usually triggered from services and executed via background tasks.

---

# 6. Email Templates and Rendering

Email templates are typically stored in:

```
mailer/templates/emails/
```

Templates may include:
- Signup email
- Verification email
- Password reset email
- Invoice email
- Helpdesk notification
- System notification
- Welcome email

Template rendering usually includes:
- Context data
- HTML template
- Plain text template
- Inline images
- Attachments (optional)

---

# 7. Integration with Other Apps

The Mailer app is used by many modules:

| App | Email Usage |
|-----|-------------|
| users | Signup, verification, password reset |
| invoices | Invoice emails |
| helpdesk | Support emails |
| integrations | Integration alerts |
| audit | Security alerts |
| teamcentral | Invitations |
| paystream | System notifications |

Other apps should call Mailer services instead of sending emails directly.

---

# 8. Internal Architecture Diagram

```
    Domain Services
            |
            v
      Mailer Service
            |
    --------------------
    |                  |
Template Service     Task Queue
    |                  |
    v                  v
Email Templates     Celery Worker
    |
    v
Email Provider
```

This architecture separates email rendering, email sending, and background tasks.

---

# 9. Design Principles

The Mailer app follows these principles:

| Principle | Description |
|----------|-------------|
| Centralized Email Service | All emails sent from one app |
| Template Based Emails | HTML templates |
| Background Email Sending | Celery tasks |
| Reusable Email Services | Used across apps |
| Separation of Rendering and Sending | Template service + email service |
| Logging and Retry | Email delivery tracking |
| Configurable Providers | SMTP or external providers |

---

# 10. Summary

The Mailer app provides centralized email sending functionality for the system.
It handles email templates, background email sending, notifications, and email
delivery logic.

By centralizing email logic, the system ensures consistent email behavior,
easier maintenance, and reusable email services across multiple domain modules.
