# DjangoPlay — Invoices App Architecture

**Version:** 1.0.0  
**Date:** 2026-03-27

---

# 1. Overview

The Invoices app manages billing, invoice generation, invoice lifecycle,
invoice payments, and invoice status tracking. It handles customer billing
and integrates with the FinCore module for financial transactions and payments.

The Invoices app is part of the Business Domain layer of the system architecture.

---

# 2. Responsibilities

The Invoices app is responsible for:

- Invoice creation
- Invoice numbering
- Invoice items and line items
- Invoice totals and taxes
- Invoice status management
- Invoice PDF generation
- Invoice payments
- Invoice cancellation
- Invoice history
- Invoice reporting
- Integration with financial transactions
- Integration with entities (customers)
- Integration with audit logs

This module handles billing and invoice lifecycle management.

---

# 3. Why Invoices App Exists

Billing and invoice management should be separated from financial ledger logic.
The Invoices app manages invoice lifecycle, while FinCore manages financial
transactions and ledger entries.

The Invoices app provides:

| Purpose | Description |
|--------|-------------|
| Billing System | Customer billing |
| Invoice Lifecycle | Draft → Paid |
| Invoice Items | Line items |
| Payment Tracking | Invoice payments |
| PDF Generation | Invoice documents |
| Invoice History | Billing history |
| Integration with Finance | Financial transactions |
| Customer Billing | Customer invoices |

Separating invoices from financial core allows clean separation between billing
logic and accounting logic.

---

# 4. App Structure

Typical structure of the Invoices app:

```
invoices/
│
├── models.py
├── admin.py
├── apps.py
├── urls.py
├── views.py
├── serializers.py
├── signals.py
├── tasks.py
│
├── services/
│   ├── invoice_service.py
│   ├── invoice_item_service.py
│   ├── invoice_payment_service.py
│   ├── invoice_pdf_service.py
│   └── invoice_workflow_service.py
│
├── selectors/
│   └── invoice_query_service.py
│
├── policies/
│   └── invoice_policy.py
│
└── tests/
```

---

# 5. Invoice Data Model

Typical models in the Invoices app include:

| Model | Purpose |
|------|---------|
| Invoice | Main invoice |
| InvoiceItem | Invoice line items |
| InvoicePayment | Payment records |
| InvoiceStatusHistory | Status history |
| InvoiceTax | Tax details |
| InvoiceDiscount | Discounts |
| InvoiceAttachment | Invoice documents |
| InvoiceNote | Notes |
| InvoiceTemplate | Invoice templates |

Invoices are typically linked to:
- Entities (customers)
- FinCore (payments and transactions)
- Users (created by)
- Organizations
- Locations
- Audit logs

---

# 6. Invoice Lifecycle

## Invoice Lifecycle Diagram

```
    Draft Invoice
        |
        v
    Issued Invoice
        |
        v
    Sent Invoice
        |
        v
    Paid Invoice
        |
        v
    Closed Invoice
        |
        v
    Cancelled Invoice
```

Invoice statuses may include:
- Draft
- Issued
- Sent
- Paid
- Overdue
- Cancelled
- Closed

Invoice status transitions should be handled by workflow services.

---

# 7. Invoice Payment Flow

## Invoice Payment Flow Diagram

```
    Invoice Payment Received
            |
            v
    Invoice Payment Service
            |
            v
    Create Payment Record
            |
            v
Call FinCore Transaction Service
            |
            v
    Update Invoice Status
            |
            v
     Audit Log Entry
```

Payments should update both invoice records and financial ledger entries.

---

# 8. Integration with Other Apps

The Invoices app integrates with multiple modules:

| App | Usage |
|-----|------|
| Entities | Customers and vendors |
| FinCore | Financial transactions |
| Users | Invoice creators |
| TeamCentral | Organization invoices |
| Audit | Invoice change logs |
| Mailer | Invoice emails |
| Locations | Billing addresses |
| Paystream | Business operations |
| API Docs | API logging |

The Invoices app depends on FinCore for financial transactions.

---

# 9. Internal Architecture Diagram

```
                API Views / Views
                        |
                        v
                    Serializers
                        |
                        v
                    Services
                        |
            --------------------------
            |                        |
        Selectors               Policies
            |
            v
        Models
            |
            v
        Database
            |
            v
        Signals
            |
            v
Audit Log / Tasks / PDF / Payments
```

This architecture follows the standard service-layer architecture pattern.

---

# 10. Design Principles

The Invoices app follows these principles:

| Principle | Description |
|----------|-------------|
| Billing Lifecycle | Invoice workflow |
| Separation from Finance | Finance handled by FinCore |
| Service Layer | Business logic in services |
| Invoice Workflow | Status transitions |
| Payment Integration | FinCore integration |
| PDF Generation | Invoice documents |
| Audit Logging | Invoice changes logged |
| Customer Billing | Entity-based billing |

---

# 11. Summary

The Invoices app manages billing, invoice lifecycle, invoice payments, and
invoice documents. It integrates with the FinCore module for financial
transactions and with the Entities module for customer data.

The Invoices app handles billing logic while FinCore handles financial ledger
and transaction logic, ensuring separation between billing and accounting systems.
