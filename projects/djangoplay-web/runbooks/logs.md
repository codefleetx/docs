# Logs Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.1  

---

## 1. Overview

Logs are the primary source of information for debugging issues in production and development environments.

DjangoPlay Web generates logs from multiple components:

| Component        | Log Type                |
| ---------------- | ----------------------- |
| Django           | Application logs        |
| Gunicorn         | Access and error logs   |
| Celery           | Worker logs             |
| Mailer           | Email logs              |
| Nginx            | Access and error logs   |
| System           | systemd logs            |
| Application Apps | Per-app logs            |
| djangoplay-cli   | Log streaming interface |

Logs can be accessed in two ways:

1. Direct log file access (standard Linux tools)
2. Using **djangoplay-cli log streaming** (recommended for development)

---

## 2. Log Types

Typical logs include:

| Log                 | Description                     |
| ------------------- | ------------------------------- |
| Django log          | Application requests and errors |
| Gunicorn access log | HTTP access logs                |
| Gunicorn error log  | Gunicorn errors                 |
| Celery worker log   | Background task logs            |
| Mailer log          | Email sending logs              |
| App logs            | Logs per Django app             |
| Nginx access log    | HTTP requests                   |
| Nginx error log     | Nginx errors                    |

---

## 3. Viewing Logs (Standard Method)

### View last lines of a log file

```bash id="l1x7vq"
tail -n 50 <log-file>
````

### Follow log in real time

```bash id="skd0py"
tail -f <log-file>
```

### Search logs for errors

```bash id="f7r2l7"
grep ERROR <log-file>
```

### Search logs by keyword

```bash id="34vxd9"
grep "keyword" <log-file>
```

---

## 4. Using djangoplay-cli for Logs (Recommended for Local Development)

DjangoPlay CLI provides a convenient way to stream and filter logs.

### Stream default application logs

```bash id="a9p0zk"
dplay dev logs
```

This streams the main Django log file.

### Stream logs for a specific app

```bash id="wq2xkr"
dplay dev logs <app_name>
```

Examples:

```bash id="u6hz7g"
dplay dev logs users
dplay dev logs mailer
dplay dev logs frontend
```

### Show last N lines

```bash id="ksg9v3"
dplay dev logs django --no-follow -n 100
```

### Filter logs by level

```bash id="b5y3gd"
dplay dev logs django --level ERROR
```

Log levels:

| Level    | Description         |
| -------- | ------------------- |
| DEBUG    | Debug information   |
| INFO     | General information |
| WARNING  | Warning messages    |
| ERROR    | Errors              |
| CRITICAL | Critical errors     |

### CLI Logging Options Summary

| Command                             | Description           |
| ----------------------------------- | --------------------- |
| dplay dev logs                      | Stream main logs      |
| dplay dev logs users                | Stream users app logs |
| dplay dev logs mailer               | Stream mailer logs    |
| dplay dev logs django -n 100        | Show last 100 lines   |
| dplay dev logs django --level ERROR | Show only errors      |
| dplay logs                          | Global logs command   |

---

## 5. Log Rotation

Logs should be rotated to prevent disk space issues.

Recommended rotation policy:

| Log Type         | Rotation       |
| ---------------- | -------------- |
| Application logs | Daily          |
| Gunicorn logs    | Daily          |
| Celery logs      | Daily          |
| Nginx logs       | Weekly         |
| System logs      | System default |

Use tools such as:

* logrotate
* journald
* external logging system

---

## 6. Debugging Order (Very Important)

When debugging an issue, check logs in this order:

1. Django application log
2. App-specific logs
3. Mailer log
4. Gunicorn error log
5. Celery worker log
6. Nginx error log
7. System logs

This order helps isolate the issue quickly.

---

## 7. Common Log Investigation Scenarios

| Problem                     | Check Logs              |
| --------------------------- | ----------------------- |
| 500 error                   | Django log              |
| Emails not sending          | Mailer log + Celery log |
| Background job failed       | Celery log              |
| Site slow                   | Gunicorn + system logs  |
| Static files not loading    | Nginx log               |
| Login issues                | Users app log           |
| API errors                  | Django log              |
| Worker not processing tasks | Celery log              |

---

## 8. Summary

Logs can be accessed using:

| Method         | Usage                 |
| -------------- | --------------------- |
| tail / grep    | Production servers    |
| system logs    | Service debugging     |
| djangoplay-cli | Local development     |
| Log files      | Application debugging |

---
