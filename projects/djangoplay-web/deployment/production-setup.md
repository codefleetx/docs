# Production Setup — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Deployment Documentation  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

This document describes how to deploy DjangoPlay Web in a production environment.

The production deployment uses a standard Python web application deployment architecture with:

* Nginx (reverse proxy)
* Gunicorn (application server)
* Django (application)
* PostgreSQL (database)
* Redis (cache and message broker)
* Celery (background workers)
* systemd (service manager)

---

## 2. Production Architecture

High-level production architecture:

```

Client
↓
Reverse Proxy (Nginx)
↓
Application Server (Gunicorn)
↓
Django Application
↓
PostgreSQL Database
Redis (Cache / Broker)
↓
Celery Workers

````

---

## 3. Server Requirements

Minimum recommended server:

| Resource   | Recommended |
| ---------- | ----------- |
| CPU        | 2 cores     |
| RAM        | 4 GB        |
| Disk       | 20 GB       |
| OS         | Linux       |
| Python     | 3.11+       |
| PostgreSQL | 14+         |
| Redis      | 6+          |

---

## 4. Required Software

Install required software on the server:

* Python
* PostgreSQL
* Redis
* Nginx
* Virtualenv
* Git
* Build tools

---

## 5. Application Deployment Steps

### Step 1 — Clone Repository

```bash
git clone <repository-url>
cd project
````

### Step 2 — Create Virtual Environment

```bash
python -m venv .venv
source .venv/bin/activate
```

### Step 3 — Install Dependencies

```bash
pip install --upgrade pip
pip install -e ".[prod]"
```

---

## 6. Environment Configuration

Production configuration should be stored in environment variables or a protected environment file.

Example environment variables:

```
DJANGO_SETTINGS_MODULE=project.settings.prod
DJANGO_SECRET_KEY=<secret>
DATABASE_URL=<database_url>
REDIS_HOST=<redis_host>
REDIS_PORT=<redis_port>
REDIS_PASSWORD=<redis_password>
EMAIL_HOST_USER=<email_user>
EMAIL_HOST_PASSWORD=<email_password>
```

Environment variables should be loaded using a process manager such as systemd.

---

## 7. Database Setup

Create database and run migrations:

```bash
python manage.py migrate
```

Create superuser:

```bash
python manage.py create_superuser
```

---

## 8. Static Files

Collect static files:

```bash
python manage.py collectstatic --no-input
```

Static files should be served by Nginx.

---

## 9. Starting Services

Services to start:

| Service       | Description               |
| ------------- | ------------------------- |
| Gunicorn      | Django application server |
| Celery Worker | Background jobs           |
| Celery Beat   | Scheduled jobs            |
| Redis         | Message broker            |
| PostgreSQL    | Database                  |
| Nginx         | Reverse proxy             |

Services should be configured using systemd.

---

## 10. Verification Checklist

After deployment verify:

| Check             | Expected |
| ----------------- | -------- |
| Application loads | Yes      |
| Admin login works | Yes      |
| Static files load | Yes      |
| Celery running    | Yes      |
| Emails sending    | Yes      |
| Logs writing      | Yes      |

---

## 11. Updating Deployment

To deploy new changes:

```bash
git pull
pip install -e ".[prod]"
python manage.py migrate
python manage.py collectstatic --no-input
restart services
```
