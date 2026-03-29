# PostgreSQL Runbook — DjangoPlay Web

**Project:** DjangoPlay Web  
**Document Type:** Runbook  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

PostgreSQL is the primary database used by DjangoPlay Web.

---

## 2. Connect to Database

To connect to the PostgreSQL database:

```bash
psql -U <user> -h <host> <database>
````

---

## 3. Common Commands

### List databases:

```sql
\l
```

### List tables:

```sql
\dt
```

### Describe table:

```sql
\d table_name
```

### Exit:

```sql
\q
```

---

## 4. Restart PostgreSQL

To restart PostgreSQL service:

```bash
sudo systemctl restart postgresql
```

---

## 5. Check Connections

To check current database connections:

```sql
SELECT * FROM pg_stat_activity;
```

---

## 6. Database Size

To check the size of a specific database:

```sql
SELECT pg_size_pretty(pg_database_size('<database>'));
```

---
