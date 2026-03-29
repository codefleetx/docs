# Backup Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

Backups are critical for disaster recovery.

The following data must be backed up:

| Data                      | Priority     |
| ------------------------- | ------------ |
| PostgreSQL database       | Critical     |
| Media files               | Critical     |
| Environment configuration | Important    |
| Logs                      | Optional     |
| Static files              | Not required |

---

## 2. Database Backup

Example PostgreSQL backup:

```bash id="3ef9p5"
pg_dump -U <db_user> -h <db_host> <db_name> > backup.sql
````

Compressed backup:

```bash id="8sdg3k"
pg_dump -U <db_user> <db_name> | gzip > backup.sql.gz
```

---

## 3. Media Files Backup

Backup media directory:

```bash id="68f8zi"
tar -czf media-backup.tar.gz /path/to/media/
```

---

## 4. Backup Schedule

Recommended backup schedule:

| Backup      | Frequency |
| ----------- | --------- |
| Database    | Daily     |
| Media       | Daily     |
| Full system | Weekly    |

---

## 5. Backup Storage

Backups should be stored:

* On another server
* In object storage
* In secure backup storage
* Not on same disk as server

---

## 6. Backup Verification

Always verify backups:

```bash id="89n2fo"
gunzip backup.sql.gz
psql <db_name> < backup.sql
```
