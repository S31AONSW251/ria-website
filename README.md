# AION / RIA Website

Premium React/Vite website for AION and RIA OS, a private, local-first intelligence architecture for persistent memory, agents, software, automation, and owner-approved action.

Public website: [www.aiontec.co.in](https://www.aiontec.co.in)

## Primary experiences

- Investor-ready RIA OS company and product presentation
- Product, technology, research, security, founder, and investor routes
- RIA Software Exchange demonstration catalog at `/software-exchange`
- Working frontend submission and repository-review MVP with validation, local pending records, email review fallback, and an optional POST transport

## Software Exchange submission MVP

The Exchange does not claim to upload or publish software without backend storage.

- Drafts and pending review records are stored in the submitter's browser with `localStorage`.
- When no endpoint is configured, the UI prepares a review email; the user must review and send it.
- Set `VITE_SOFTWARE_EXCHANGE_SUBMISSION_ENDPOINT` to an HTTPS or same-origin endpoint that accepts POSTed JSON.
- Set `VITE_SOFTWARE_EXCHANGE_REVIEW_EMAIL` to change the mail review recipient.
- Copy `.env.example` to `.env.local` for local configuration.

The transport and validation contract lives in `src/services/softwareExchangeService.ts`. A production backend should authenticate reviewers, persist submissions, scan dependencies, manage status transitions, and publish only approved records.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Image folders

Upload website images under:

```text
public/images/
```

Download placeholders live under:

```text
public/downloads/
```
