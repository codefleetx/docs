# Contributing Guide — CodeFleet Documentation

**Project:** CodeFleet Labs Documentation  
**Document Type:** Governance  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

This document describes how to contribute to the CodeFleet Labs documentation repository.

Documentation contributions include:

* Architecture documentation
* API documentation
* Deployment documentation
* Runbooks
* User guides
* Governance documents
* Glossary updates
* Diagrams
* Documentation portal updates

---

## 2. Contribution Principles

Documentation should be:

* Clear
* Accurate
* Consistent
* Secure (no sensitive information)
* Maintainable
* Version controlled
* Structured
* Professional

---

## 3. Documentation Structure

All documentation must follow repository structure:

```

docs/
common/
governance/
templates/
projects/
project-name/
architecture/
api/
deployment/
runbooks/
user-guide/

```

---

## 4. Writing New Documentation

When adding a new document:

1. Use documentation templates from `templates/`
2. Add document metadata:

   * Project
   * Document Type
   * Last Updated
   * Version
3. Add table of contents
4. Use clear headings
5. Avoid sensitive information
6. Use placeholders for credentials or domains
7. Follow style guide
8. Submit changes via merge request

---

## 5. Updating Documentation

When updating documentation:

1. Update version number
2. Update last updated date
3. Update CHANGELOG
4. Ensure links still work
5. Ensure formatting consistency

---

## 6. Commit Message Guidelines

Documentation commits should use clear messages:

Examples:

```

docs: add deployment documentation
docs: update runbook for celery
docs: fix API documentation formatting
docs: add glossary entries
docs: update architecture diagram

```

---

## 7. Security Rules for Documentation

Never include:

* Passwords
* API keys
* Secret keys
* Private IP addresses
* Internal domains
* Email credentials
* Database credentials
* Personal information
* SSH keys
* Access tokens

Use placeholders like:

```

<database_url>
<secret_key> <domain> <email>

```

---

## 8. Documentation Review Checklist

Before submitting documentation:

| Check                     | Status |
| ------------------------- | ------ |
| No sensitive information  |        |
| Correct structure         |        |
| Uses template             |        |
| Table of contents present |        |
| Version updated           |        |
| Links working             |        |
| Formatting consistent     |        |
| Grammar checked           |        |
