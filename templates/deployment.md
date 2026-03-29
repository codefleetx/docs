# Deployment Guide — {Project Name}

---

## Overview

Describe deployment architecture and environment.

---

## Infrastructure

| Component | Technology |
|----------|------------|
| Server | Linux |
| Web Server | Nginx |
| App Server | Gunicorn |
| App | Django |
| DB | PostgreSQL |
| Cache | Redis |
| Workers | Celery |

---

## Deployment Steps

1. Pull latest code
2. Install dependencies
3. Run migrations
4. Collect static files
5. Restart services

---

## Commands

```bash
git pull
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart gunicorn
sudo systemctl restart celery
sudo systemctl reload nginx
````

---

## Environment Variables

List environment variables.

---

## Logs

Where logs are stored.

---

## Rollback

Steps to rollback deployment.