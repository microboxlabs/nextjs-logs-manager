# Logs Manager 📊

This is a simple web application built with **Next.js**, **Tailwind CSS**, **Flowbite**, **ShadUI**, **Prisma**, and **SQLite** to manage and view logs efficiently.

## Features ⚡

- View and filter logs 🔍
- Search logs by message, service, or level 🔎
- Upload logs from a file (admin only) 📂
- Delete logs (admin only) 🗑️
- Mobile responsiveness 📱
- Role-based access control with JWT authentication and authorization 🔐

## Prerequisites 🛠️

Before you can start using the application, make sure you have the following installed:

- **Node.js** (version 20 or higher) ⚙️
- **npm** (comes with Node.js) 📦
- **Prisma CLI** (for managing the database) 🔧

## Getting Started 🚀

Follow these steps to get the app up and running:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/logs-manager.git
    ```

2. Navigate to the project directory:
    ```bash
    cd logs-manager
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Prepare the database:
    - Create a new file named `dev.db` in the `/prisma/` directory 📁
    - Run the following command to create the database:
      ```bash
      npx prisma migrate dev --name init
      ```
    - Seed the database with sample users and log levels by running the following command:
      ```bash
      npx tsx prisma/seed.ts
      ```
      This will create two users (an admin and a regular user) and three log levels (`INFO`, `WARNING`, and `ERROR`).

5. Apply the migration to create the necessary tables:
    ```bash
    npx prisma migrate dev
    ```

6. Start the development server:
    ```bash
    npm run dev
    ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser 🌐

8. You're ready to start using the application! 🎉

## Test Users 👥

To test the application, use the following credentials for the pre-created users:

### Admin User:
- **Email**: `admin@example.com`
- **Password**: `a04223bd6e21cc921eafed9944217959`

### Regular User:
- **Email**: `norma.collins@example.com`
- **Password**: `a0dbf7aada542cc93ff84a79f4a846c6`

The admin user has full access to all features, while the regular user has limited access (e.g., cannot upload or delete logs).

## Technologies Used 🛠️

- **Next.js**: React framework for building the application ⚛️
- **Tailwind CSS**: Utility-first CSS framework for styling 🎨
- **Flowbite**: Component library for UI elements 📑
- **ShadUI**: Custom component library for building the user interface 🖌️
- **JWT**: For secure user authentication and authorization 🔑
- **Prisma**: Database ORM for managing SQLite 🗄️
- **SQLite**: Lightweight database for storing logs 🗃️
