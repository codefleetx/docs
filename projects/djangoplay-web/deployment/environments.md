# Environments — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Deployment Documentation  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

DjangoPlay Web supports multiple runtime environments for development and production usage.

Each environment has different configuration, services, and deployment methods.

The main environments are:

| Environment | Purpose                 |
| ----------- | ----------------------- |
| Local       | Developer environment   |
| Production  | Live server environment |

---

## 2. Environment Types

### Local Environment

Used for development on a developer machine.

Managed using **djangoplay-cli**.

Services started locally:

* Django development server
* Celery worker
* Redis
* Static files
* SSL certificates (optional)

### Production Environment

Used for live deployment on a server.

Services managed using:

* systemd
* Nginx
* Gunicorn
* Celery
* Redis
* PostgreSQL

---

## 3. Local Development Environment

Local environment is managed using **djangoplay-cli**.

The CLI automates:

* Environment encryption
* Static file collection
* Redis reset
* Celery worker start
* SSL certificate generation
* Development server start
* Log streaming

### Local Environment Configuration Files

Local environment uses configuration stored in the user's home directory:

```

~/.dplay/config.yaml
~/.dplay/.secrets

```

#### config.yaml

Contains:

* Site configuration
* Database host and port
* Redis host and port
* Email configuration
* Repository path
* Django settings module

#### .secrets

Contains sensitive values:

* Django secret key
* Encryption key
* Database password
* Email credentials
* OAuth credentials

This file must never be committed to version control.

---

## 4. Production Environment

Production environment runs on a server with the following stack:

| Component          | Tool       |
| ------------------ | ---------- |
| Reverse Proxy      | Nginx      |
| Application Server | Gunicorn   |
| Background Jobs    | Celery     |
| Message Broker     | Redis      |
| Database           | PostgreSQL |
| Process Manager    | systemd    |
| CDN / SSL          | Cloudflare |

High-level flow:

```

Client
↓
Cloudflare
↓
Nginx
↓
Gunicorn
↓
Django
↓
PostgreSQL / Redis
↓
Celery Workers

```

---

## 5. Configuration Management

Configuration is environment-specific.

| Environment        | Configuration Location  |
| ------------------ | ----------------------- |
| Local              | ~/.dplay/config.yaml    |
| Local Secrets      | ~/.dplay/.secrets       |
| Production         | Environment variables   |
| Production Secrets | System environment file |

Application reads configuration from environment variables and configuration files depending on environment.

---

## 6. Secrets Management

Secrets include:

* Database password
* Django secret key
* Email credentials
* OAuth credentials
* Redis password
* Encryption keys

### Rules for Secrets

* Never commit secrets to repository
* Never store secrets in settings files
* Use environment variables or secrets file
* Restrict file permissions
* Use different secrets for each environment

---

## 7. Environment Variables

Typical environment variables:

| Variable               | Description          |
| ---------------------- | -------------------- |
| DJANGO_SETTINGS_MODULE | Django settings file |
| DATABASE_URL           | Database connection  |
| REDIS_HOST             | Redis host           |
| REDIS_PORT             | Redis port           |
| REDIS_PASSWORD         | Redis password       |
| EMAIL_HOST_USER        | Email username       |
| EMAIL_HOST_PASSWORD    | Email password       |
| DJANGO_SECRET_KEY      | Django secret key    |

---

## 8. Directory Structure (Production Example)

```

/var/www/project/
├── app/
│   └── backend/
├── staticfiles/
├── media/
├── logs/
├── landing/
└── .venv/

```

---

## 9. Environment Comparison

| Feature         | Local             | Production        |
| --------------- | ----------------- | ----------------- |
| Server          | Django dev server | Gunicorn          |
| Reverse proxy   | No                | Nginx             |
| SSL             | Self-signed       | Cloudflare        |
| Process manager | CLI               | systemd           |
| Static files    | Django            | Nginx             |
| Logs            | Local files       | System + app logs |
| Celery          | CLI worker        | systemd service   |
| Redis           | Local             | Server            |
| PostgreSQL      | Local             | Server            |
