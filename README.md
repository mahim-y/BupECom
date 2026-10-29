# BUP Nest — Multi-vendor Campus Marketplace

Anyone can **buy** products and anyone can **open a seller account** to sell items.

## Features

- Buyer accounts, cart, checkout, and order history
- Seller accounts with product CRUD and order fulfillment
- SQLite database (Node built-in `node:sqlite`)
- Cookie sessions (JWT via `jose`) + bcrypt passwords
- Payment methods: COD, bKash, Nagad, Card (order recorded; mobile money marked pending)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo accounts

Password for all: `password123`

| Role   | Email                 |
|--------|-----------------------|
| Buyer  | buyer@example.com     |
| Seller | alumni@bupnest.com    |
| Admin  | admin@bupnest.com     |

## Main routes

| Path | Purpose |
|------|---------|
| `/` | Campus landing + featured market |
| `/shop` | Full product catalog |
| `/product/[id]` | Product detail |
| `/cart` → `/checkout` | Buy flow |
| `/orders` | Buyer order history |
| `/sell` → `/register?as=seller` | Become a seller |
| `/seller` | Seller hub (listings + stats) |
| `/seller/orders` | Fulfill orders |
| `/login` `/register` | Auth |

## Reset demo data

```bash
npm run db:reset
npm run dev
```

Database file: `data/marketplace.db` (created automatically on first run).
