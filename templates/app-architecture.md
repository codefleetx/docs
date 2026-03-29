# App Architecture — {App Name}

**Version:** 1.0.0  
**Date:** <YYYY-MM-DD>

---

## Table of Contents

1. Overview
2. Responsibilities
3. App Structure
4. Internal Architecture
5. Request Flow
6. Services
7. Models
8. Integrations
9. Permissions and Policies
10. Signals and Tasks
11. Summary

---

## 1. Overview

Describe what this app does and its purpose.

---

## 2. Responsibilities

List responsibilities of the app.

- Manage users
- Manage invoices
- Send emails
- Logging
- etc.

---

## 3. App Structure

```

app/
├── models/
├── services/
├── selectors/
├── views/
├── serializers/
├── policies/
├── tasks.py
├── signals.py
└── utils.py

```

---

## 4. Internal Architecture

Explain layered architecture inside app.

View → Serializer → Service → Policy → Model → Database

---

## 5. Request Flow

Describe how a typical request flows inside this app.

---

## 6. Services

List important services and what they do.

| Service | Purpose |
|--------|---------|
| UserService | User operations |
| InvoiceService | Invoice operations |

---

## 7. Models

List main models and relationships.

---

## 8. Integrations

External systems or integrations used by this app.

---

## 9. Permissions and Policies

Explain how authorization works.

---

## 10. Signals and Tasks

Signals and background jobs used.

---

## 11. Summary

Summary of app architecture.
