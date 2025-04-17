# Authentication Management System

A web application for managing authenticatiom, including features for login,register, user information.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts (user/admin).
- **Payment system**: Here is amarpay payment system, and store payment history in database.
  
## Live URL

You can view the live project at: [Project Live URL](https://task-pxl-hut.vercel.app)

## Technology Used


- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

Before you can run this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (or use MongoDB Atlas for a cloud instance)

##  Endpoints
- POST   /api/auth/register
- POST   /api/auth/login
- GET    /api/auth/me (Protected Route, Need to provide login token)
- GET    /api/auth/admin (Protected Route, Need to provide login token)
- POST   /api/auth/refresh-token

- POST   /api/payments/checkout


## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Debos602/pxlhutTask.git
cd pxlhutTask
command : npm i
