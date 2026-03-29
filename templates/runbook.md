# Runbook — {Service/System Name}

---

## Overview

Describe what this runbook is for.

---

## Common Commands

### Restart Service

```bash
sudo systemctl restart <service>
````

### Check Status

```bash
sudo systemctl status <service>
```

### View Logs

```bash
tail -f /var/log/<service>.log
```

---

## Troubleshooting

| Issue                | Solution         |
| -------------------- | ---------------- |
| Service not starting | Check logs       |
| High CPU             | Restart workers  |
| DB connection error  | Restart postgres |

---

## Emergency Steps

1. Restart services
2. Check logs
3. Check database
4. Check Redis
5. Check disk space
6. Contact admin

---

## Logs Location

| Service  | Log Path          |
| -------- | ----------------- |
| Django   | logs/django.log   |
| Gunicorn | /var/log/gunicorn |
| Celery   | /var/log/celery   |
| Nginx    | /var/log/nginx    |
