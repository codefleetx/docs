# Celery — Background Workers

**Project:** DjangoPlay Web  
**Document Type:** Deployment Documentation  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

Celery is used for background job processing.

Celery handles:

* Email sending
* Notifications
* Scheduled jobs
* Report generation
* Background processing
* Data cleanup tasks

Celery uses Redis as the message broker.

---

## 2. Celery Components

| Component     | Description                  |
| ------------- | ---------------------------- |
| Celery Worker | Executes background tasks    |
| Celery Beat   | Scheduler for periodic tasks |
| Redis         | Message broker               |
| Django        | Task producer                |

---

## 3. Starting Celery Worker

Example command:

```bash
celery -A project worker -l info
````

---

## 4. Starting Celery Beat

```bash
celery -A project beat -l info
```

---

## 5. systemd Service Example

Example Celery service:

```
[Unit]
Description=Celery Worker
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/project/backend
EnvironmentFile=/path/to/environment/file
ExecStart=/path/to/venv/bin/celery -A project worker --loglevel=info
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

---

## 6. Logs

Celery logs should be stored in log files and monitored regularly.
