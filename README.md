# 🛍️ Bazaar — Polyglot Microservices Based E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/Built%20With-Turborepo-blue?logo=turborepo" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=white" />
  <img src="https://img.shields.io/badge/Hono-FF5733?logo=cloudflare&logoColor=white" />
  <img src="https://img.shields.io/badge/Kafka-231F20?logo=apachekafka&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-000000?logo=clerk&logoColor=white" />
</p>

---

## ⚡️ Overview

**Bazaar** is a **next-generation, microservices-based e-commerce platform** built using **multiple frameworks and databases**, all orchestrated with a **Turborepo monorepo**.
It demonstrates **real-world distributed architecture** — event-driven communication, polyglot persistence, and framework interoperability.

> 🧠 The goal: showcase how different technologies (Express, Fastify, Hono, Next.js, Kafka, Stripe, Clerk, etc.) can cohesively form a **modular, scalable, event-driven e-commerce system**.

---

<!-- ## 🧩 Architecture Overview

<p align="center">
  <img src="docs/bazaar-architecture.png" alt="Bazaar Architecture Diagram" width="900"/>
</p> -->

<!-- <details> -->
### 📘 API Flow


```
                        ┌────────────────────┐
                        │     Web (Next.js)  │
                        └─────────┬──────────┘
                                  │
       ┌──────────────────────────┼───────────────────────────┐───────────────────────────┐
       ▼                          ▼                           ▼                           ▼
┌──────────────┐          ┌──────────────┐            ┌────────────────┐           ┌─────────────────┐   
│ Product Svc  │──Kafka──▶│ Order Svc    │──Kafka─ ─▶│ Email Svc      │──Kafka──▶│ Payment Svc     │──Stripe Webhook──▶ Payment Success
│ (Express +   │          │ (Fastify +   │            │ (Worker + Kafka│           │ (Hono + Stripe  │
│ PostgreSQL)  │          │ MongoDB)     │            │ Consumers)     │           |  )              |
└──────────────┘          └──────────────┘            └────────────────┘           └─────────────────┘
       ▲                          
       │                          
       │         
       │         
       │  
       │ 
       │  
       │  
       │
       ▼
┌──────────────┐
│ Auth Svc     │──Clerk API──▶ User Authentication
└──────────────┘
```
<!-- </details> -->

---

## 🧱 Project Structure

```
bazaar/
├── apps/
│   ├── web/               # Next.js storefront (user-facing)
│   ├── admin/             # Next.js admin dashboard
│   ├── product-service/   # Express + TypeScript + PostgreSQL (via Prisma)
│   ├── order-service/     # Fastify + TypeScript + MongoDB (via Mongoose)
│   ├── payment-service/   # Hono + TypeScript + Stripe integration
│   ├── auth-service/      # Express + TypeScript + Clerk authentication
│   └── email-service/     # Kafka consumers for transactional emails
│
├── packages/
│   ├── kafka/             # Kafka setup (producer/consumer utilities)
│   ├── product-db/        # Prisma + NeonDB client
│   ├── order-db/          # Mongoose + MongoDB connection
│   └── types/             # Shared TypeScript types across services
│
└── turbo.json
```

---

## ⚙️ Services Overview

| Service               | Framework           | Database                | Description                                                     |
| --------------------- | ------------------- | ----------------------- | --------------------------------------------------------------- |
| 🛒 **Product Service** | Express             | PostgreSQL (via Prisma) | Manages products, CRUD ops, and publishes Kafka events          |
| 📦 **Order Service**   | Fastify             | MongoDB (via Mongoose)  | Handles order creation/retrieval, consumes & emits Kafka events |
| 💳 **Payment Service** | Hono                | —                       | Integrates with Stripe APIs and webhooks for payment flow       |
| 👤 **Auth Service**    | Express             | Clerk                   | Manages user retrieval and authentication                       |
| ✉️ **Email Service**   | Node (Kafka Worker) | —                       | Subscribes to `user.created` & `order.created` for emails       |

---

## 🌍 Frontend Applications

| App               | Framework | Purpose                                               |
| ----------------- | --------- | ----------------------------------------------------- |
| 🏪 **Web App**     | Next.js   | Customer-facing storefront (products, checkout, etc.) |
| 🧑‍💼 **Admin Panel** | Next.js   | Dashboard to manage products, orders, and payments    |

---

## 📦 Shared Packages

| Package          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| 🧭 **kafka**      | Central Kafka setup and utilities           |
| 🧩 **product-db** | Prisma + NeonDB connection for product data |
| 🧱 **order-db**   | MongoDB connection and Mongoose models      |
| 🧾 **types**      | Shared TypeScript types between services    |

---

## 🧠 Design Philosophy

- 🧩 **Polyglot Microservices:** Each service uses a unique framework and database.
- ⚡ **Event-Driven Architecture:** Kafka enables async communication and decoupling.
- 🧰 **Turborepo Monorepo:** Enables isolated builds and shared dependency management.
- 🔒 **Decoupled Auth:** Clerk ensures secure authentication across apps.
- 💳 **Modern Payments:** Stripe webhook for `checkout.session.completed` event.

---

## 🧰 Local Development

```bash
# Clone the repo
git clone https://github.com/muditkalra/microservices-ecommerce.git
cd microservices-ecommerce

# Install dependencies
pnpm install

# Start Kafka  (via Docker Compose)
cd packages/kafka
docker compose up -d

# Run a specific service (example: product-service)
pnpm --filter product-service dev

# Or run all apps & services
pnpm run dev
```

> ⚠️ Configure `.env` files for each app (Stripe, Clerk, databases, etc.) before running.

---

## 🐳 Docker & Deployment

Each service can be containerized using its Dockerfile and orchestrated via `docker-compose.yml`.
For production, the system is ready for **Kubernetes**, **AWS ECS**, or **Fly.io** deployments.

---

## 📈 Future Roadmap

- [ ] API Gateway / GraphQL BFF
- [ ] Redis caching layer
- [ ] gRPC inter-service communication
- [ ] Prometheus + Grafana monitoring
- [ ] CI/CD with GitHub Actions
- [ ] Background worker optimizations

---

## ⚙️ Tech Stack Summary

| Layer               | Technologies                                    |
| ------------------- | ----------------------------------------------- |
| **Frontend**        | Next.js (App Router, TypeScript)                |
| **Backend**         | Express, Fastify, Hono                          |
| **Databases**       | PostgreSQL (Prisma), MongoDB (Mongoose), NeonDB |
| **Auth**            | Clerk                                           |
| **Payments**        | Stripe                                          |
| **Messaging**       | Kafka                                           |
| **Repo Management** | Turborepo + PNPM                                |
| **Language**        | TypeScript                                      |
| **Infrastructure**  | Docker Compose, optional Kubernetes             |

---

## 💡 Key Learnings Showcased

✅ Real-world **microservices communication** using Kafka  
✅ Handling **different databases** per service (polyglot persistence)  
✅ Clean **service isolation** via Turborepo  
✅ Seamless **third-party API integration** (Stripe, Clerk)  
✅ **Event-driven flow** with async reliability

---

## 👨‍💻 Author

**Mudit Kalra**  
Fullstack & Systems Design Enthusiast  
Building scalable distributed systems with Node.js, Kafka, and Next.js

---

## 🌟 Project Status

> 🚧 In active development — evolving toward a fully distributed, event-driven e-commerce ecosystem.  
> ⭐ **Star this repo** if you find the architecture inspiring!

