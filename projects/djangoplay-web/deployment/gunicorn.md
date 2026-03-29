# Gunicorn — Application Server

**Project:** DjangoPlay Web  
**Document Type:** Deployment Documentation  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

Gunicorn is used as the WSGI application server for DjangoPlay Web in production.

Gunicorn runs the Django application and handles incoming HTTP requests forwarded by Nginx.

---

## 2. Gunicorn Architecture

```

Nginx → Gunicorn → Django

````

Gunicorn manages multiple worker processes to handle concurrent requests.

---

## 3. Gunicorn Configuration

Typical Gunicorn settings:

| Setting        | Description                |
| -------------- | -------------------------- |
| workers        | Number of worker processes |
| timeout        | Request timeout            |
| bind           | Address and port           |
| access-logfile | Access logs                |
| error-logfile  | Error logs                 |

---

## 4. Example Gunicorn Command

```bash
gunicorn project.wsgi:application \
    --workers 2 \
    --bind 127.0.0.1:8000 \
    --timeout 120 \
    --access-logfile logs/gunicorn-access.log \
    --error-logfile logs/gunicorn-error.log
````

---

## 5. systemd Service Example

Gunicorn should be run using a systemd service.

Example service file:

```
[Unit]
Description=Gunicorn Service
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/project/backend
EnvironmentFile=/path/to/environment/file
ExecStart=/path/to/venv/bin/gunicorn project.wsgi:application \
    --workers 2 \
    --bind 127.0.0.1:8000 \
    --timeout 120
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

---

## 6. Restarting Gunicorn

```
sudo systemctl restart gunicorn
```

---

## 7. Checking Status

```
sudo systemctl status gunicorn
```

---

## 8. Logs

Gunicorn logs typically include:

| Log        | Description        |
| ---------- | ------------------ |
| access log | HTTP requests      |
| error log  | Application errors |
