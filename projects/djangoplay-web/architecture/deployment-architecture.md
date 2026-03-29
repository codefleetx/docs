# DjangoPlay — Deployment Architecture

**Version:** 1.0.0  
**Date:** 2026-03-27

---

## Overview

This document describes the production deployment architecture of DjangoPlay.

The application is deployed on a Linux server using Nginx, Gunicorn,
Celery, Redis, and PostgreSQL, with Cloudflare acting as a CDN and SSL proxy.

---

## Infrastructure Components

| Component | Technology |
|-----------|------------|
| CDN / SSL | Cloudflare |
| Web Server | Nginx |
| Application Server | Gunicorn |
| Application | Django |
| Database | PostgreSQL |
| Cache / Broker | Redis |
| Background Jobs | Celery |
| OS | Ubuntu |
| Hosting | Oracle Cloud |

---

## Deployment Architecture Diagram

```

User Browser
|
v
Cloudflare (SSL / CDN)
|
v
Nginx
|
v
Gunicorn
|
v
Django
|
+---- PostgreSQL
|
+---- Redis
|
+---- Celery Worker

```

---

## Request Flow

1. User sends HTTPS request
2. Cloudflare terminates SSL
3. Request forwarded to Nginx
4. Nginx serves static/media or proxies to Gunicorn
5. Gunicorn runs Django application
6. Django interacts with PostgreSQL and Redis
7. Background tasks handled by Celery
8. Response returned through Nginx → Cloudflare → User

---

## Services Running on Server

| Service | Purpose |
|--------|---------|
| nginx | Web server and reverse proxy |
| djangoplay | Gunicorn Django app |
| djangoplay-celery | Celery worker |
| redis | Message broker |
| postgresql | Database |

---

## Logs

| Service | Log Location |
|--------|---------------|
| Django | backend/logs/django.log |
| Mailer | backend/logs/mailer.log |
| Gunicorn | /var/log/djangoplay/gunicorn-error.log |
| Celery | /var/log/djangoplay/celery-worker.log |
| Nginx | /var/log/nginx |
| PostgreSQL | PostgreSQL logs |
