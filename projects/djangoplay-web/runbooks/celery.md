# Celery Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

Celery is used for background job processing.

Common Celery tasks include:

* Sending emails
* Scheduled tasks
* Background processing
* Data cleanup
* Notifications

---

## 2. Check Celery Status

```bash id="vqz4fr"
sudo systemctl status celery
````

---

## 3. Restart Celery

```bash id="l75n9a"
sudo systemctl restart celery
```

---

## 4. Celery Logs

Check Celery logs for task failures.

---

## 5. Common Issues

| Issue             | Cause              |
| ----------------- | ------------------ |
| Tasks not running | Worker stopped     |
| Tasks stuck       | Redis issue        |
| Emails not sent   | Mailer task failed |
| Slow tasks        | Worker overloaded  |

---
