# Security Policy

## Application

Econobis is a multi-tenant PHP / React based SaaS platform for energy cooperatives and related organizations.

The platform consists of:
- a backend application for project and customer administration,
- a customer portal application,
- API integrations for external systems and web forms.

---

## Supported Versions

Security updates are applied to all actively maintained production releases of the Econobis platform.

| Version | Supported |
| ------- | --------- |
| Current production release | Yes |
| Unsupported or deprecated releases | No |

---


## Dependency Management

Dependencies are managed using Composer and NPM.

Security vulnerabilities are monitored using:
- composer audit
- npm audit

Dependencies are regularly reviewed and updated where appropriate.

---

## Security Measures

The platform implements multiple security measures, including:

* HTTPS/TLS enforcement
* Backend and frontend input validation
* Output escaping
* Prepared statements
* CSRF protection
* Secure session and cookie handling
* Role-based authorization
* OAuth-based authentication and authorization
* Login protection and rate limiting
* Authentication and administrative logging
* Multi-tenant data separation
* API authentication and access control
* Security headers and Content Security Policy (CSP)
* Environment-based secret management
* Regular dependency updates
* Database encryption-at-rest where applicable

---

## Configuration & Secrets

Sensitive configuration and secrets are managed through environment variables and are never committed to source control.

---

## Reporting Vulnerabilities


Please do not report security vulnerabilities through public issue trackers.

Security reports can be submitted to:

klant@xaris.nl

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested remediation if available

---

## Responsible Disclosure

We kindly request that researchers:

* Avoid disruption of systems or services
* Do not access unnecessary data
* Report findings confidentially
* Allow reasonable time for remediation before disclosure

---

## Scope

This policy applies to:

* Backend platform
* Customer portal application
* API endpoints and integrations
* External web form integrations
* Authentication and authorization systems
* Multi-tenant customer environments
* Database interactions

Excluded:
* Third-party integrations outside this repository
* Customer-managed external systems

---

## Application Portfolio

This application is registered in the internal application portfolio, including ownership, classification, lifecycle management and operational management information.

---

## Compliance

This application supports:
* ISO 27001:2022 principles
* OWASP Top 10 recommendations
* GDPR/AVG guidelines

---

## Contact

| Purpose | Contact              |
| ------- |----------------------|
| Security | klant@xaris.nl  |
| Development | software@xaris.nl    |
| Support | support@econobis.nl |

---
