# MicroboxLabs Fullstack Challenge: Logs Ingestion and Viewing

This application allows MicroboxLabs to manage system logs efficiently through features like **log uploading**, **viewing**, and **filtering**. It was built using **Next.js**, **Tailwind CSS**, and **Flowbite**. Below is the comprehensive documentation for the project.

---

## 🚀 **Project Overview**

The application addresses the need to ingest and visualize logs for different microservices, including role-based access control for Admin and Regular users.

**Core Features**:

1. **Admin users** can upload log files for processing.
2. **Regular users** can view logs and apply advanced filters.
3. Logs are displayed in a responsive table with pagination.
4. Filters include date range, log levels, and service names.

---

## 📁 **Project Structure**

The project is organized as follows:

```plaintext
📦 NEXTJS-LOGS-MANAGER
│
├── app/                   # Next.js API routes and pages
│   ├── api/               # API endpoints
│   ├── dashboard/         # Dashboard pages
│   └── login/             # Authentication pages
│
├── src/                   # Source files
│   ├── components/        # Reusable React components
│   ├── constants/         # Constant files for table columns
│   ├── contexts/          # Context management (e.g., Alerts)
│   ├── forms/             # Forms for creating and uploading logs
│   ├── lib/               # Utility files (e.g., broadcasting logs, DB configs)
│   ├── services/          # Backend service handlers
│   ├── types/             # TypeScript types
│   └── styles/            # Global stylesheets
│
├── prisma/                # Prisma setup and migrations
├── public/                # Static files (e.g., images, log samples)
├── __tests__/             # Unit and integration tests
├── .storybook/            # Storybook configuration
└── styles/                # Tailwind CSS configuration
```

---

## 🛠️ **Technologies and Libraries**

The project uses the following technologies and libraries:

### **Core Libraries**

| **Library**                   | **Usage**                                                    |
| ----------------------------- | ------------------------------------------------------------ |
| **Next.js**                   | React framework for building the application and API routes. |
| **React**                     | Component-based UI development.                              |
| **Tailwind CSS**              | Utility-first CSS framework for styling.                     |
| **Flowbite & Flowbite-React** | UI component library for rapid development.                  |
| **Prisma**                    | ORM for database management (SQLite).                        |
| **NextAuth.js**               | Authentication library for handling user sessions.           |
| **Formidable**                | Handles file uploads in the API route.                       |
| **Axios**                     | HTTP client for handling requests.                           |
| **Yup & Formik**              | Form validation and handling for log creation forms.         |
| **bcrypt**                    | Password hashing for user authentication.                    |

### **Development and Testing**

| **Library**                  | **Usage**                                         |
| ---------------------------- | ------------------------------------------------- |
| **Jest**                     | Testing framework for unit and integration tests. |
| **Supertest**                | HTTP testing library for API routes.              |
| **Storybook**                | UI component development and testing.             |
| **@testing-library/react**   | Testing library for React components.             |
| **ESLint & Prettier**        | Code linting and formatting.                      |
| **Tailwind Prettier Plugin** | Enhances formatting for Tailwind CSS.             |
| **TSConfig Paths**           | Simplified path imports for TypeScript.           |

---

## ⚙️ **Setup Instructions**

### Prerequisites

- Node.js installed (v18+ recommended)
- Prisma CLI installed
- SQLite database (auto-configured)

---

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/NEXTJS-LOGS-MANAGER.git
   cd NEXTJS-LOGS-MANAGER
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup the database**:

   ```bash
   npx prisma migrate dev
   npm run seed
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

---

### **Testing**

Run all tests:

```bash
npm run test
```

Run Storybook:

```bash
npm run storybook
```

---

## 🔧 **Core Features and Implementation**

### **1. Log Upload (Admin Only)**

- **API Endpoint**: `/api/log/upload`
- Logs are uploaded via a plain text file and parsed into a structured format:

  ```log
  [2024-11-01 10:00:00] [INFO] Service-A: Successfully completed task.
  ```

### **2. Viewing Logs**

- Logs are displayed using a **DataTable** component.
- **Columns**: Timestamp, Log Level, Service Name, Message.
- **Pagination**: Table supports pagination for large datasets.

### **3. Filtering Logs**

- **Date Range**: Filter logs by start and end dates.
- **Log Level**: Select `INFO`, `WARNING`, or `ERROR`.
- **Service Name**: Filter logs by the generating service.

### **4. Role-Based Access Control**

- Admin users can upload logs.
- Regular users can only view and filter logs.
- Authentication managed by **NextAuth.js**.

---

## 🎨 **UI Components**

### **Reusable Components**

| **Component**    | **Description**                                |
| ---------------- | ---------------------------------------------- |
| **CustomNavbar** | Responsive navigation bar with user menu.      |
| **Dropzone**     | Drag-and-drop zone for uploading files.        |
| **DataTable**    | Dynamic table with pagination and filters.     |
| **Loader**       | Loading spinner with optional overlay.         |
| **AlertMessage** | Alerts for success, error, and info messages.  |
| **CustomModal**  | Modal with dynamic content and action buttons. |

---

## 🧪 **Testing Coverage**

The project includes unit and integration tests for:

1. **API Routes**: Verifying file uploads, log processing, and data retrieval.
2. **Components**: UI behavior, including forms, tables, and filters.

Testing libraries used:

- Jest
- Testing Library
- Supertest

---

## 📊 **Storybook**

Storybook is configured to showcase all reusable components interactively:

- **Run Storybook**: `npm run storybook`
- Accessible at: [http://localhost:6006](http://localhost:6006)

---

## 🌟 **Optional Enhancements**

- **Real-Time Updates**: Implemented with Server-Sent Events (SSE).
- **Role-Based Authentication**: Admin and regular users have distinct access.

---

## 🚀 **Deployment**

- The project can be deployed to **Vercel** or any Next.js-compatible hosting provider.
- **Build Command**: `npm run build`

---

## 🤝 **Credits**

This solution was implemented as part of the MicroboxLabs Fullstack Challenge by Marat Joseph Lanza Meitchouk.

If you have any questions, contact **<devtest@microboxlabs.com>**.

---

## **Thank you for reviewing the project! 🚀**
