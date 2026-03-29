# API Documentation — {Project/App Name}

**Version:** v1

---

## Overview

Describe the API and its purpose.

---

## Authentication

Describe authentication method:

- Session authentication
- Token authentication
- JWT
- OAuth

---

## Base URL

```

/api/v1/

```

---

## Endpoints

### List Resources

GET /api/v1/<resource>/

---

### Create Resource

POST /api/v1/<resource>/

Request:
```

{
"field": "value"
}

```

Response:
```

{
"id": 1,
"field": "value"
}

```

---

### Retrieve Resource

GET /api/v1/<resource>/{id}/

---

### Update Resource

PUT /api/v1/<resource>/{id}/

---

### Delete Resource

DELETE /api/v1/<resource>/{id}/

---

## Status Codes

| Code | Meaning |
|-----|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Notes

Additional API notes.
