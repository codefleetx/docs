# Documentation Style Guide — CodeFleet Labs

**Project:** CodeFleet Labs Documentation  
**Document Type:** Governance  
**Last Updated:** 2026-03-28  
**Version:** 1.0  

---

## 1. Overview

This document defines documentation writing standards for CodeFleet Labs documentation.

All documentation should follow this style guide to maintain consistency across projects.

---

## 2. Document Structure

Each document should follow this structure:

```

Title
Document Metadata
Table of Contents
Overview
Main Sections
Examples / Commands
Tables / Diagrams
Summary

```

---

## 3. Document Metadata Format

Every document must start with:

```

# Document Title

Project: <project name>
Document Type: <type>
Last Updated: YYYY-MM-DD
Version: X.X

```

---

## 4. Heading Rules

Use consistent heading hierarchy:

```

# Title

## Section

### Subsection

#### Sub-subsection

```

Do not skip heading levels.

---

## 5. Writing Style

Documentation should be:

* Clear
* Concise
* Professional
* Technical but readable
* Neutral tone
* Avoid slang
* Avoid unnecessary opinions
* Use active voice
* Use consistent terminology

---

## 6. Formatting Rules

### Lists

Use tables for structured information.

Use bullet lists for:

* Features
* Steps
* Items

Use numbered lists for:

* Procedures
* Workflows
* Ordered steps

---

## 7. Tables

Use tables for:

* Configuration values
* Comparisons
* Commands
* Environments
* Modules
* Services

---

## 8. Code Blocks

Use code blocks for:

* Commands
* Configuration
* API examples
* SQL queries
* Scripts

---

## 9. Placeholders

Always use placeholders for sensitive values:

| Example        | Use           |
| -------------- | ------------- |
| `<domain>`     | Domain        |
| `<db_name>`    | Database name |
| `<db_user>`    | Database user |
| `<secret_key>` | Secret key    |
| `<email>`      | Email         |
| `<path>`       | File path     |

---

## 10. File Naming Conventions

Use lowercase with hyphens:

| Correct                    | Incorrect             |
| -------------------------- | --------------------- |
| system-design.md           | SystemDesign.md       |
| deployment-architecture.md | deployArchitecture.md |
| user-guide.md              | userGuide.md          |

---

## 11. Versioning Documentation

Documentation version format:

```
1.0 → Initial version
1.1 → Minor updates
1.2 → Minor updates
2.0 → Major changes
```