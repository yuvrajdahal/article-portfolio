---
title: "About"
layout: "about"
kicker: "About"
description: "Two years of shipping full-stack applications, and a growing preference for the parts of the job that happen after the code is written."
---

Hey, I'm Yuvraj — a full-stack developer based in Kathmandu, currently at **Saurik Solution** in Baneshwor. Most of my work sits between the browser and the machine: React and Next.js on one end, Node services, queues and databases on the other, and the Docker, Linux and CI that connect them.

## What I'm building now

At Saurik I architected **Baalvo**, a multi-vertical marketplace platform. It's an Nx monorepo holding 13+ microservices and 6+ React frontends, fronted by a single API gateway that handles request proxying, rate limiting, and per-service Swagger documentation.

The interesting problems there haven't been the CRUD. They've been the seams: enforcing multi-tenant, fine-grained permissions with Casbin and a Sequelize adapter; keeping chat and counter-offer negotiation live over Socket.IO; running geospatial filtering through PostGIS; moving work off the request path with BullMQ and Redis; and wiring Kafka and Elasticsearch together so services talk asynchronously and product search still returns in under a second.

The last piece was the build. The Jenkins pipeline now runs parallelized Docker builds across 16 services in batched stages with registry-based layer caching, which removed manual build and deploy steps from the process entirely.

## Before that

I spent two years at **Infoclick Digital Solutions** in Biratnagar, where I deployed and maintained an enterprise management system on AWS — EC2 and Linux, watched through real-time performance charts, with availability that mattered to real customers.

That's where I learned to care about observability. I set up Prometheus and Grafana to track system metrics, visualize infrastructure health, and alert on production environments, and I moved the team's releases onto GitHub Actions so builds and deployments stopped being a manual ritual. I also mentored junior developers and interns there, through code review and pair programming.

## Outside work

I'm in the fourth year of a Bachelor in Computer Application at Mahendra Morang Adarsha Multiple Campus in Biratnagar, after a Diploma in Computer Engineering.

I show up at hackathons. At **Vertex Hacks** in Kathmandu I built the Node.js backend for AgroStack, an agriculture delivery app. At **Taranga** in Dharan I led a team building Sajha Samaj, a platform for startups to communicate and share resources, and ran the project end to end.

If you're building something that needs to hold up under load, [get in touch](/contact/).
