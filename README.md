### MicroboxLabs Fullstack Challenge: Logs Ingestion and Viewing
This technical test requires you to design and implement a **Logs Ingestion and Viewing** system using **Next.js**, **Tailwind CSS**, and **Flowbite**. The solution will help MicroboxLabs manage and visualize incoming log entries efficiently.

#### **Before You Begin**
Fork this repository and invite the provided collaborators: `@korutx`, `@odtorres`. Should you have any questions, contact `devtest@microboxlabs.com`. 

#### **Guidelines**
- We provide a basic Flowbite + Next.js template to get you started.
- You can use any additional libraries you see fit, but make sure to justify your choices.
- Flowbite documentation is available [here](https://flowbite-react.com/docs/getting-started/introduction).
- Tailwind CSS documentation is available [here](https://tailwindcss.com/docs/utility-first).
- Next.js documentation is available [here](https://nextjs.org/docs).

#### **Problem Description**
MicroboxLabs requires a system that helps engineers manage incoming system logs for different microservices. Nora, a team member, currently collects and reviews logs manually, which is inefficient and prone to errors.

The new system will allow Nora and her team to upload and view logs in an organized manner, providing filtering capabilities to identify specific issues.

#### **Core Requirements**
The goal is to create a web application where users can **upload**, **store**, and **view** logs with basic filtering functionality. The key features are as follows:

### **User Roles**
1. **Admin User**: 
   - Has access to all features, including uploading logs, viewing logs, and managing entries.
2. **Regular User**: 
   - Can view logs and filter them but cannot upload new log files.

### **Features**
1. **Logs Uploading (Admin Only)**
   - Admin users can upload a **plain text file** containing log entries.
   - Each log file is processed, and individual log entries are stored in the system.
   - Logs have the following format:
     ```
     [2024-11-01 10:00:00] [INFO] Service-A: Successfully completed task.
     [2024-11-01 10:01:00] [ERROR] Service-B: Failed to connect to the database.
     [2024-11-01 10:02:00] [WARNING] Service-C: Response time is slow.
     ```
   - Each log entry must be parsed to store:
     - **Timestamp** (e.g., 2024-11-01 10:00:00)
     - **Log Level** (INFO, ERROR, WARNING)
     - **Service Name** (e.g., Service-A)
     - **Message** (e.g., Successfully completed task)

2. **Viewing Logs**
   - Users (Admin and Regular) can **view all log entries** in a table format.
   - The table must include columns for **Timestamp**, **Log Level**, **Service Name**, and **Message**.
   - Logs should be **paginated** to handle large volumes effectively.

3. **Filtering Logs**
   - Users can filter logs by:
     - **Date Range**: Start and end dates to narrow down the logs within a specific period.
     - **Log Level**: INFO, WARNING, ERROR.
     - **Service Name**: Filter by the specific service generating the logs.
   - Users can apply multiple filters simultaneously.

4. **Responsive User Interface**
   - Use **Tailwind CSS** and **Flowbite** components to create a simple and responsive UI that works well on both desktop and mobile devices.
   - The application should have:
     - A **navbar** to navigate to different parts of the app.
     - A **dashboard** page where logs can be viewed and filtered.
     - A form/page for **Admin** users to upload log files.

5. **Basic Authorization**
   - Admin users should be able to access the upload page, while regular users should not.
   - Regular users should only have access to the log viewing and filtering functionalities.

6. **Database**
   - Use a lightweight database (e.g., SQLite) to store parsed log entries.
   - Each log entry should be stored as a separate record in the database.

### **Use Cases**
1. **Nora Uploads Logs**:
   - Nora logs in as an **Admin** and navigates to the **Logs Upload** page.
   - She selects a plain text file with system logs and uploads it.
   - The system parses the file, extracts individual log entries, and stores them.

2. **Viewing Logs**:
   - A **Regular User** logs in and navigates to the **Dashboard**.
   - They see a table with the most recent log entries, including details such as timestamp, log level, service name, and message.

3. **Filtering Logs**:
   - A user (either Admin or Regular) wants to find all **ERROR** logs from **Service-B** for the last week.
   - They apply a date range filter, select the **ERROR** log level, and specify **Service-B**.
   - The table updates to show only the logs that match these criteria.

#### **Technologies to Use**
- **Frontend**: Next.js, Tailwind CSS, Flowbite.
- **Backend**: Next.js API routes for handling log file uploads and serving log entries.
- **Database**: SQLite or an in-memory solution to store logs.

#### **Aspects to Be Evaluated**
1. **Functionality**:
   - Does the solution meet all the core requirements?
   - Are users able to upload, view, and filter logs effectively?
2. **Software Design**:
   - Logical organization of files, components, and API routes.
   - Clean separation between frontend and backend logic.
3. **Code Quality**:
   - Readable, maintainable code with clear comments.
   - Good use of modern JavaScript and TypeScript features.
4. **Testing**:
   - Simple unit tests for API routes.
   - Basic UI tests for log viewing and filtering.
5. **UI/UX**:
   - Effective use of **Tailwind CSS** and **Flowbite** to create a user-friendly, clean, and responsive interface.

#### **Aspects to Ignore**
- **Advanced Visual Design**: Focus on functionality rather than intricate visual styling.
- **Scalability and Performance Optimization**: The emphasis is on demonstrating core capabilities, not handling massive volumes of data.

#### **Optional Bonus Points**
- **Role-Based Authentication**: Implement simple role-based access control for Admin vs. Regular User capabilities.
- **Real-Time Updates**: Add functionality for real-time updates using Server-Sent Events (SSE) or WebSockets.

#### **Getting Started**
1. **Fork/Clone** the repository.
2. Create the project using **Next.js**, **Tailwind CSS**, and **Flowbite**.
3. Implement the **Logs Ingestion and Viewing** scenario with the requirements provided.
4. Utilize any tools or resources, including AI (e.g., ChatGPT or GitHub Copilot), to assist you.

This task is designed to assess your ability to work on a small fullstack application, focusing on core concepts and problem-solving skills. We look forward to seeing your solution!
