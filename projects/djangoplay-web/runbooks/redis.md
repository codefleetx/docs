# Redis Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

Redis is used for:

- Cache
- Celery message broker
- Background task queue
- Session storage (optional)

---

## 2. Connect to Redis

To connect to Redis:

```bash
redis-cli
````

With password:

```bash
redis-cli -a <password>
```

---

## 3. Test Redis

To test Redis connection:

```bash
redis-cli ping
```

Expected response:

```
PONG
```

---

## 4. Flush Cache

To flush all cached data and queued tasks:

```bash
redis-cli FLUSHALL
```

Use with caution — this deletes all cached data and queued tasks.

---

## 5. Restart Redis

To restart Redis service:

```bash
sudo systemctl restart redis
```

---

## 6. Monitor Redis

To monitor Redis in real-time:

```bash
redis-cli monitor
```

---
