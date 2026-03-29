# Services Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

This runbook describes how to manage system services used by DjangoPlay Web in production.

### Core services:

| Service     | Purpose                   |
| ----------- | ------------------------- |
| nginx       | Reverse proxy             |
| gunicorn    | Django application server |
| celery      | Background workers        |
| celery-beat | Scheduled tasks           |
| redis       | Cache and message broker  |
| postgres    | Database                  |

These services are typically managed using **systemd**.

---

## 2. Service Status

To check the status of a service:

```bash
sudo systemctl status <service-name>
````

Examples:

```bash
sudo systemctl status nginx
sudo systemctl status gunicorn
sudo systemctl status celery
sudo systemctl status redis
sudo systemctl status postgresql
```

---

## 3. Start Services

To start a service:

```bash
sudo systemctl start <service-name>
```

---

## 4. Stop Services

To stop a service:

```bash
sudo systemctl stop <service-name>
```

---

## 5. Restart Services

To restart a service:

```bash
sudo systemctl restart <service-name>
```

Restarting is commonly required after:

* Deployments
* Configuration changes
* Environment variable changes
* Dependency updates

---

## 6. Enable Services on Boot

To enable a service to start on boot:

```bash
sudo systemctl enable <service-name>
```

---

## 7. Disable Services on Boot

To disable a service from starting on boot:

```bash
sudo systemctl disable <service-name>
```

---

## 8. Reload systemd

After changing service files, reload systemd:

```bash
sudo systemctl daemon-reload
```

---

## 9. Service Restart Order

When restarting the full application stack, follow this order:

1. Redis
2. PostgreSQL
3. Gunicorn
4. Celery
5. Nginx

---
