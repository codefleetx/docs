# Restore Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

This runbook describes how to restore the system from backups.

---

## 2. Restore Database

To restore the database from an SQL backup:

```bash
psql -U <db_user> <db_name> < backup.sql
````

To restore from a compressed backup:

```bash
gunzip backup.sql.gz
psql -U <db_user> <db_name> < backup.sql
```

---

## 3. Restore Media Files

To restore the media files:

```bash
tar -xzf media-backup.tar.gz -C /
```

---

## 4. After Restore

After restoring the database, run the following commands:

```bash
python manage.py migrate
python manage.py collectstatic --no-input
restart services
```

---

## 5. Restore Checklist

After restore, verify the following:

| Check              | Expected |
| ------------------ | -------- |
| Application starts | Yes      |
| Login works        | Yes      |
| Data visible       | Yes      |
| Static files load  | Yes      |
| Celery running     | Yes      |

---
