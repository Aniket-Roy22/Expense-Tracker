# Full Stack Expense Tracker Dashboard

A modern full-stack expense tracking dashboard built using React, Express.js, Prisma ORM, PostgreSQL, and JWT Authentication.

---

# Table of Contents

- [Tech Stack](#tech-stack)
	- [Frontend](#frontend)
	- [Backend](#backend)
- [Project Features](#project-features)
- [Folder Structure](#folder-structure)
- [Authentication System](#authentication-system)
	- [Access Token](#access-token)
	- [Refresh Token](#refresh-token)
- [Authentication Flow](#authentication-flow)
- [Database Schema](#database-schema)
	- [Users Table](#users-table)
	- [Categories Table](#categories-table)
	- [Expenses Table](#expenses-table)
- [API Endpoints](#api-endpoints)
	- [Authentication Routes](#authentication-routes)
	- [Category Routes](#category-routes)
	- [Expense Routes](#expense-routes)
- [Frontend Architecture](#frontend-architecture)
	- [Context API](#context-api)
	- [Axios Interceptors](#axios-interceptors)
	- [Protected Routes](#protected-routes)
- [Installation Guide](#installation-guide)
	- [1. Clone Repository](#1-clone-repository)
	- [2. Backend Setup](#2-backend-setup)
	- [3. Configure Environment Variables](#3-configure-environment-variables)
	- [4. Run Prisma Migration](#4-run-prisma-migration)
	- [5. Start Backend Server](#5-start-backend-server)
	- [6. Frontend Setup](#6-frontend-setup)
	- [7. Start Frontend](#7-start-frontend)
- [Screenshots](#screenshots)
- [Learning Outcomes](#learning-outcomes)
- [Author](#author)

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Context API
- CSS

---

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

# Project Features

- User Registration & Login
- JWT Authentication
- Refresh Token Authentication Flow
- Protected API Routes
- Create Expense Categories
- Update/Delete Categories
- Reset All Expenses Inside Category
- Add/Edit/Delete Expenses
- Spending Limit Tracking
- Remaining Balance Calculation
- Responsive Dashboard UI
- Reusable React Components
- Axios Interceptors
- Category-wise Expense Management

---

# Folder Structure

```bash
Expense-Tracker-Dashboard/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   │   └── schema.prisma
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

# Authentication System

This project uses a dual-token JWT authentication system.

---

## Access Token

- Short-lived JWT token
- Stored in localStorage
- Attached to protected requests

---

## Refresh Token

- Long-lived JWT token
- Stored in HTTP-only cookies
- Automatically generates new access tokens

---

# Authentication Flow

```text
User Login
    ↓
Server validates credentials
    ↓
Access Token returned
Refresh Token stored in cookie
    ↓
Frontend stores access token
    ↓
Protected requests include token
    ↓
Access token expires
    ↓
Axios interceptor calls /auth/token
    ↓
New access token issued
```

---

# Database Schema

# Users Table

| Column   | Type         |
| -------- | ------------ |
| id       | UUID         |
| username | VARCHAR(100) |
| email    | VARCHAR(150) |
| password | VARCHAR(255) |

---

# Categories Table

| Column        | Type         |
| ------------- | ------------ |
| id            | UUID         |
| user_id       | UUID         |
| name          | VARCHAR(255) |
| limit_amount  | INT          |

---

# Expenses Table

| Column       | Type         |
| ------------ | ------------ |
| id           | UUID         |
| category_id  | UUID         |
| title        | VARCHAR(255) |
| amount       | INT          |
| created_at   | TIMESTAMP    |

---

# API Endpoints

Postman: [API Documentation](https://documenter.getpostman.com/view/39120321/2sBXwnsBXY)

# Authentication Routes

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/auth/register` | Register user        |
| POST   | `/auth/login`    | Login user           |
| POST   | `/auth/token`    | Refresh access token |
| POST   | `/auth/logout`   | Logout user          |

---

# Category Routes

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/categories`             | Get all categories           |
| GET    | `/categories/:id`         | Get single category          |
| POST   | `/categories`             | Create category              |
| PATCH  | `/categories/:id`         | Update category              |
| DELETE | `/categories/:id`         | Delete category              |
| DELETE | `/categories/:id/reset`   | Delete all category expenses |

---

# Expense Routes

| Method | Endpoint                                           | Description           |
| ------ | -------------------------------------------------- | --------------------- |
| GET    | `/categories/:category_id/expenses`                | Get all expenses      |
| GET    | `/categories/:category_id/expenses/:id`            | Get single expense    |
| POST   | `/categories/:category_id/expenses`                | Create expense        |
| PATCH  | `/categories/:category_id/expenses/:id`            | Update expense        |
| DELETE | `/categories/:category_id/expenses/:id`            | Delete expense        |

---

# Frontend Architecture

# Context API

Authentication state is globally managed using:

```text
AuthContext
```

---

# Axios Interceptors

Axios automatically:

- attaches access tokens
- refreshes expired tokens
- retries failed requests

---

# Protected Routes

Protected routes prevent unauthorized access to dashboard pages.

---

# Installation Guide

# 1. Clone Repository

```bash
git clone https://github.com/Aniket-Roy22/Expense-Tracker.git
```

---

# 2. Backend Setup

```bash
cd server
npm install
```

---

# 3. Configure Environment Variables

Create a `.env` file inside `server/`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/expensedb"

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

---

# 4. Run Prisma Migration

```bash
npx prisma migrate dev
```

---

# 5. Start Backend Server

```bash
npm run server
```

Backend runs on:

```text
http://localhost:3000
```

---

# 6. Frontend Setup

```bash
cd client
npm install
```

---

# 7. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Screenshots

## Login Page

![Login](./screenshots/login.png)

---

## Dashboard

![Dashboard](./screenshots/dashboard.png)

---

## Single Category Page

![Category](./screenshots/category.png)

---

# Author

**Intern ID:** CITS730
<br>
**Full Name:** Aniket Roy
<br>
**No. of Weeks:** 4
<br>
**Project Name:** Expense Tracker Dashboard
<br>
**Project Scope:** The project aims to build a full-stack expense management dashboard with secure JWT authentication, category-wise expense tracking, spending limit monitoring, and complete CRUD functionality for categories and expenses. The project demonstrates frontend-backend integration using React, Express.js, Prisma ORM, PostgreSQL, and Axios interceptors.
