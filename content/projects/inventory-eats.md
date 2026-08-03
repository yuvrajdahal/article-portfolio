---
title: "Inventory Eats"
date: 2024-06-01
label: "Product"
period: "2024 — 2025"
description: "Inventory and point-of-sale system for restaurants and cafés — stock, orders, staff roles, and sales analytics, deployed on AWS."
blurb: "Inventory and POS system for restaurants and cafés: stock and order tracking, time-based sales analytics, and role-based access for staff, owners, and admins."
stack:
  - "React"
  - "Next.js"
  - "Node.js"
  - "MongoDB"
  - "Docker"
  - "AWS EC2"
  - "Lightsail"
  - "Route 53"
  - "Prometheus"
  - "Grafana"
---

Inventory Eats gives restaurants and cafés one place to track what they have, what they're selling, and where the money went.

## What it does

The inventory side tracks stock, orders, and food items, with performance analytics on top so an owner can see what's moving and what's sitting.

The **point-of-sale** side processes orders and reports sales over time, which is the number most owners actually check.

Account management covers transactions, booking statuses, and income and expense tracking — the bookkeeping that otherwise happens in a notebook.

**Role-based access control** separates staff, owner, and admin permissions, so a server can ring up an order without seeing the margins.

## Running it

The application is Dockerized and deployed on **AWS**, using EC2 and Lightsail with Route 53 for DNS.

Because it's a system a business depends on during service hours, it's monitored: **Prometheus** collects metrics and **Grafana** visualizes infrastructure health, with alerting configured for the production environment. When something degrades, the dashboard says so before the restaurant does.
