# University Library

A modern web application for managing a university library, built with cutting-edge technologies.

## Technologies Used

- **Neon Postgres**: A scalable and serverless PostgreSQL database.
- **Drizzle ORM**: A lightweight and type-safe ORM for database interactions.
- **AuthJS + Bcrypt**: Secure user authentication and password hashing.
- **ImageKit**: A powerful image optimization and delivery service.
- **Upstash**: Serverless Redis for caching and message queues.

## Features

- **Automated Email Alerts**: 
    - Powered by Upstash Redis qStash and Resend (or EmailJS).
    - Sends notifications for important updates and reminders.

- **Next.js AFTER**: 
    - Advanced features and optimizations for server-side rendering and static site generation.

## Getting Started

Follow the instructions below to set up and run the project locally.

1. Clone the repository:
     ```bash
     git clone https://github.com/your-repo/university-library.git
     ```
2. Install dependencies:
     ```bash
     npm install
     ```
3. Configure environment variables:
     - Add your database, authentication, and email service credentials.

4. Start the development server:
     ```bash
     npm run dev
     ```

## License

This project is licensed under the [MIT License](LICENSE).

---
05:06:30