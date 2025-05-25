# 🧑‍💼 Job Management System

A role-based internal application designed to streamline the process of managing job postings within a company. Built with a focus on clarity, data security, and scalability.

---

## 🚀 Overview

The Job Management System enables HR personnel to create and manage job postings while giving admins full oversight of the hiring process. It ensures role-based access, job status tracking, and simple yet effective workflows.

---

## 🧩 Core Features

### 1. 👥 Role-Based Functionality

#### 🔹 HR Users Can:
- Create job postings.
- Update job details (e.g., position, company, location).
- Change job statuses:
  - `Pending` – Job is newly created.
  - `Interview` – Interview rounds in progress.
  - `declined` – Job filled or closed.

#### 🔹 Admin Can:
- View all job postings across the company.
- Update the status of any job.
- Monitor and oversee the hiring process to ensure alignment with company goals.

---

### 2. 📌 Job Status Tracking

The `jobStatus` field tracks the progress of each job:
- **Pending** – New job posted.
- **Interview** – Candidates are being interviewed.
- **Declined** – Position has been filled or closed.

This allows transparent and real-time updates for both HR and admin users.

---

### 3. 🔒 Data Security and Isolation

- Each HR user can only view and manage jobs they’ve created.
- Enforced using the `createdBy` field (linked to the user's ID).
- Ensures strong access control and data privacy.

---

### 4. 🛠️ Simple & Efficient Design

- Uses Mongoose’s built-in methods for CRUD operations.
- Clean and maintainable codebase designed for easy expansion and debugging.
- Prioritizes usability and responsiveness for HR teams.

---

### 5. 📈 Scalability

- Easily extendable to include more roles like:
  - **Manager** – To oversee specific department jobs.
- Designed with flexibility in mind to adapt to future business needs.

---