# Helpdesk Ticketing System 🎫

A comprehensive management system for handling support tickets, designed with a clean UI and robust state management.

## 🚀 Key Features
* **Role-Based Access Control (RBAC):** Separate interfaces and permissions for **Customers**, **Agents**, and **Admins**.
* **Ticket Management:** Users can create, view, and comment on tickets.
* **Workflow Routing:** Admins can assign tickets to specific agents and manage system-wide statuses.
* **Real-time Updates:** Global state management using **Redux Toolkit**.
* **Responsive Design:** Fully adapted for all screen sizes using **Material UI**.

## 🛠️ Tech Stack
* **Frontend:** React (TypeScript)
* **State Management:** Redux Toolkit
* **UI Library:** Material UI (MUI)
* **Forms:** React Hook Form
* **Notifications:** SweetAlert2
* **API Interaction:** Axios

## 📋 Role Permissions
| Role | Capabilities |
| :--- | :--- |
| **Customer** | Create tickets, view own tickets, add comments. |
| **Agent** | View assigned tickets, update status, add comments. |
| **Admin** | Full system access, assign tickets, manage users & statuses. |

## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone [YOUR_REPO_LINK]