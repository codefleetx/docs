# Incident Response Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

This runbook describes how to respond to production incidents.

An incident includes:

* Application down
* Database unavailable
* Emails not sending
* Background jobs failing
* High error rate
* Performance issues

---

## 2. Incident Response Steps

### Step 1 — Check Application

* Is site reachable?
* Can login page load?

### Step 2 — Check Services

Check status:

```bash id="4m1ppd"
sudo systemctl status nginx
sudo systemctl status gunicorn
sudo systemctl status celery
sudo systemctl status redis
sudo systemctl status postgresql
````

Restart failed services.

### Step 3 — Check Logs

Check logs in this order:

1. Django logs
2. Gunicorn error log
3. Celery logs
4. Nginx error log
5. System logs

### Step 4 — Check Database

Verify database connectivity.

### Step 5 — Check Redis

Verify Redis is running and reachable.

---

## 3. Common Incident Types

| Incident           | Action               |
| ------------------ | -------------------- |
| Site down          | Restart Gunicorn     |
| 502 error          | Gunicorn not running |
| Emails not sending | Check Celery         |
| Slow site          | Check CPU/RAM        |
| Login failing      | Check database       |
| Tasks stuck        | Restart Celery       |

---

## 4. Emergency Restart Procedure

Restart full stack in order:

1. PostgreSQL
2. Redis
3. Gunicorn
4. Celery
5. Nginx

---
