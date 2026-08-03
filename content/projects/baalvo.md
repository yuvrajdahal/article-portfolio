---
title: "Baalvo"
date: 2026-01-15
label: "Platform"
period: "2026 — present"
link: "https://baalmart.com"
linkLabel: "baalmart.com"
description: "A multi-vertical SaaS marketplace covering real estate, jobs, salon booking, and second-hand goods — 13 microservices behind one API gateway."
blurb: "Multi-vertical marketplace SaaS: four verticals, 13 microservices behind one Express API gateway, each with vendor, client, and admin dashboards."
stack:
  - "TypeScript"
  - "Nx monorepo"
  - "Node.js"
  - "React"
  - "PostgreSQL + PostGIS"
  - "Redis"
  - "Kafka"
  - "Elasticsearch"
  - "Socket.IO"
  - "Casbin"
  - "BullMQ"
  - "Docker"
  - "Jenkins"
---

Baalvo is a marketplace platform that runs four businesses at once: real estate, a job board, beauty and salon booking, and a second-hand marketplace. Each vertical has its own vendor, client, and admin dashboard, and they share a single backend.

## Shape of the system

The whole platform lives in one **Nx monorepo** — 13+ microservices and 6+ React frontends. That's only workable because Nx understands the dependency graph, so a change to a shared library rebuilds and retests exactly what it affects and nothing else.

In front of the services sits a single **Express API gateway**. It handles request proxying, rate limiting, and per-service documentation via Swagger, so a client integrates against one host instead of thirteen.

## Data and permissions

Every service owns its own **PostgreSQL** database. The geo-heavy verticals — real estate, salons — add **PostGIS**, because "listings near me" is the primary query in both.

**Redis** runs in several separate instances rather than one shared cache: chat pub/sub, media, and worker queues each get their own, so a spike in one doesn't evict another's data.

Authorization is **Casbin** with a Sequelize adapter, enforcing multi-tenant, fine-grained permissions per user role. Policy lookups are cached in Redis with a TTL synced to the JWT lifetime, which keeps permission checks off the database on the hot path.

## Live features and async work

Chat and the counter/negotiation flow run over **Socket.IO** — in a marketplace, haggling is the product, and it has to feel immediate.

Anything that doesn't need to block a response goes to **BullMQ** on Redis. Between services, **Kafka** carries events, so pipelines are asynchronous rather than chains of HTTP calls waiting on each other. **Elasticsearch** indexes the catalog and keeps product queries sub-second as it grows.

Payments go through **Khalti**. The entire platform is Dockerized.

## Shipping it

The pipeline is **Jenkins**, running parallelized Docker builds across 16 services in batched stages with registry-based layer caching. Before that, building and deploying was manual work at every release. Now it isn't part of the process at all.
