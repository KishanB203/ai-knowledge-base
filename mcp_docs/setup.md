# Project Setup Instructions

## Objective

Prepare the development environment before implementing any development tasks.

---

## 1. Read Inputs

Before starting the setup process, read and understand:

* `requirement.md`
* Figma design from /figma folder images

Use these inputs to understand:

* product requirements
* expected features
* user interface and layout
* user flow

---

## 2. Frontend Setup

Create the frontend project with the following stack:

* Framework: React
* Language: TypeScript
* Build Tool: Vite

Initialize a React project using Vite with the TypeScript template.

---

## 3. Backend Setup

Create a backend project with the following stack:

* Runtime: Node.js
* Framework: Express
* Language: TypeScript
* Database: MySQL

Initialize a Node.js project, install Express, and configure TypeScript.

---

## 4. Database Configuration

Use the following MySQL configuration:

Host: localhost
Port: 3306
User: root
Password: root

Backend should be able to connect to this database.

---

## 5. UI Development Rules

Frontend UI must strictly follow the Figma design. it should exact match with provided references in figma folder.

Requirements:

* Implement UI based on the Figma folder images layout
* Maintain pixel-perfect accuracy
* Match spacing, typography, colors, and alignment

---

## 6. Execution Constraint

No server or process should remain running after the task is completed.

Servers may be started temporarily for testing but must be stopped before finishing the task.

---

## 7. Existing Project Rule

If the project already exists, do not recreate it.

Only add missing files, folders, or configurations when necessary.

---

## 8. Setup Output

After setup is completed, provide:

* dependencies installed
* configuration created
* assumptions made (if any)
