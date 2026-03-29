# Nginx — Reverse Proxy

**Project:** DjangoPlay Web  
**Document Type:** Deployment Documentation  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

Nginx is used as a reverse proxy in front of Gunicorn.

Responsibilities:

* Serve static files
* Serve media files
* Reverse proxy requests to Gunicorn
* Handle HTTPS
* Handle caching headers
* Handle compression

---

## 2. Request Flow

```

Client → Nginx → Gunicorn → Django

```

---

## 3. Nginx Configuration Example

```
server 
{
    listen 80;
    server_name example.com;

    location /static/ {
        alias /path/to/staticfiles/;
    }

    location /media/ {
        alias /path/to/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

---

## 4. Static Files

Static files should be served directly by Nginx for performance.

---

## 5. Media Files

Media files should also be served directly by Nginx.

---

## 6. Reload Nginx

```

sudo nginx -t
sudo systemctl reload nginx

```
