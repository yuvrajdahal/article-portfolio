---
title: "Uses"
kicker: "Stack"
description: "The languages, services, and tools I reach for, and what I actually use each one for."
---

A working list rather than a badge wall. Everything here is something I've shipped or operated, with a note on where it earns its place.

## Languages

**JavaScript and TypeScript** are the default for everything I build, front and back. **SQL** for anything that touches Postgres seriously — I'd rather write the query than fight an ORM over it. **Python** for scripting and data work, **Bash** for the glue that lives on servers, **C/C++** from coursework, and **Dart** for mobile.

## Backend

**Node.js** for services. **Express** behind an API gateway pattern: one entry point handling proxying, rate limiting, and Swagger docs per service, so clients never talk to thirteen hosts.

**Kafka** for event-driven communication between services, which keeps pipelines asynchronous instead of chaining HTTP calls. **BullMQ** on **Redis** for background jobs, and **Socket.IO** when the feature has to be live — chat, negotiation, counters.

**Casbin** with a Sequelize adapter for role-based access control, with a JWT TTL-synced Redis cache so permission checks don't hit the database on every request.

## Data

**PostgreSQL** as the primary store, one database per service. **PostGIS** wherever location matters — real estate and salon listings both come down to "what's near me." **MongoDB** on earlier projects. **Redis** in several roles at once: chat pub/sub, media, and worker queues, kept as separate instances. **Elasticsearch** for full-text search that stays sub-second as the catalog grows.

## Frontend

**React** for application UI and **Next.js** when routing and rendering should come out of the box. **Nx** to hold the monorepo together — 13+ services and 6+ frontends in one repository only works with a real task graph behind it.

## Infrastructure

**Linux** and **Docker** everywhere. **AWS** — EC2, Lightsail, Route 53 — for hosting, with **Nginx** in front.

**Jenkins** for the current pipeline: parallelized Docker builds across 16 services in batched stages, with registry-based layer caching. **GitHub Actions** for smaller projects where the pipeline should live next to the code.

**Prometheus** and **Grafana** for metrics, dashboards, and alerting. A deploy isn't finished until you can see what it did.

## Tools

Git, a terminal, and Docker Compose for local environments. Swagger for service documentation. Postman when I need to poke at something quickly.
