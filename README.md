# Complete Library Management System

This repository contains a complete library management system with both backend and frontend components.

## Project Structure

```
complete-library-management/
│
├── backend/
│   │
│   ├── config/
│   │   ├── config.env
│   │   ├── db.config.js
│   │   ├── logger.config.js
│   │   └── cache.config.js
│   │
│   ├── controllers/
│   │   ├── admin/
│   │   │   └── adminController.js
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── borrowController.js
│   │   ├── userController.js
│   │   └── fineController.js
│   │
│   ├── database/
│   │   ├── db.js
│   │   ├── drizzle.js
│   │   ├── encryption.js
│   │   ├── migrations/
│   │   │   ├── 001_create_users_table.sql
│   │   │   ├── 002_create_books_table.sql
│   │   │   └── 003_create_borrow_table.sql
│   │   └── schema.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── checkPermissionMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   ├── roleMiddleware.js
│   │   ├── requestLogger.js
│   │   └── validatorMiddleware.js
│   │
│   ├── routes/
│   │   ├── admin/
│   │   │   └── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── borrowRoutes.js
│   │   ├── fineRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── services/
│   │   ├── admin/
│   │   │   └── adminService.js
│   │   ├── bookService.js
│   │   ├── borrowService.js
│   │   ├── fineService.js
│   │   ├── notifyUsers.js
│   │   ├── removeUnverifiedAccounts.js
│   │   ├── userService.js
│   │   └── cacheService.js
│   │
│   ├── tests/
│   │   ├── integration/
│   │   │   ├── admin/
│   │   │   │   └── admin.test.js
│   │   │   ├── auth.test.js
│   │   │   ├── books.test.js
│   │   │   ├── borrow.test.js
│   │   │   ├── fines.test.js
│   │   │   └── users.test.js
│   │   ├── unit/
│   │   │   ├── fineCalculator.test.js
│   │   │   ├── userService.test.js
│   │   │   └── bookService.test.js
│   │   ├── __mocks__/
│   │   ├── fixtures/
│   │   └── setup.js
│   │
│   ├── utils/
│   │   ├── auth/
│   │   │   ├── argon2.js
│   │   │   └── fernet.js
│   │   ├── cache/
│   │   │   ├── redis.js
│   │   │   └── cacheHelper.js
│   │   ├── debug/
│   │   │   ├── debugLogger.js
│   │   │   └── requestTracer.js
│   │   ├── emailTemplates.js
│   │   ├── error/
│   │   │   ├── AppError.js
│   │   │   └── errorTypes.js
│   │   ├── fineCalculator.js
│   │   ├── sendEmail.js
│   │   ├── sendToken.js
│   │   ├── sendVerificationCode.js
│   │   └── validators/
│   │       ├── authValidators.js
│   │       ├── bookValidators.js
│   │       ├── fineValidators.js
│   │       ├── borrowValidators.js
│   │       └── userValidators.js
│   │
│   ├── app.js
│   ├── server.js
│   └── worker.js
│
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── hooks/
│   │   └── App.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── docs/
│   ├── api/
│   │   ├── swagger.yaml
│   │   ├── postman.json
│   │   └── api-reference.md
│   ├── architecture.md
│   ├── system-requirements.md
│   └── database-schema.md
│
├── scripts/
│   ├── backup-db.sh
│   ├── restore-db.sh
│   ├── start-worker.sh
│   ├── generate-mock-data.js
│   └── setup-dev-env.sh
│
├── deployments/
│   ├── docker/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   ├── db-init.sql
│   │   └── redis.conf
│   ├── kubernetes/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   └── secrets.yaml
│   └── ci-cd/
│       ├── github-actions/
│       │   ├── build.yml
│       │   ├── test.yml
│       │   ├── deploy.yml
│       │   └── security-scan.yml
│       ├── jenkins/
│       │   ├── Jenkinsfile
│       │   ├── pipeline.groovy
│       │   ├── test-stage.groovy
│       │   └── deploy-stage.groovy
│       └── scripts/
│           ├── deploy.sh
│           ├── rollback.sh
│           ├── lint-check.sh
│           └── build-and-test.sh
│
├── .dockerignore
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── .env.example
├── .nvmrc
├── package.json
├── README.md
└── LICENSE
```

## Backend Overview

The backend directory contains the server-side code for the library management system. It includes configurations, controllers, database logic, middlewares, routes, services, tests, and utility functions.

## Frontend Overview

The frontend directory contains the client-side code for the library management system. It includes public assets, source code for components, pages, services, utilities, hooks, and configuration files.

## Setup and Run

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (for containerization)
- Kubernetes (for orchestration)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank/complete-library-management/backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   ```sh
   cp config/config.env.example config/config.env
   ```

4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

### Running with Docker

1. Build the Docker image:
   ```sh
   docker build -t library-management .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 3000:3000 library-management
   ```

### Running with Kubernetes

1. Apply the Kubernetes configurations:
   ```sh
   kubectl apply -f deployments/kubernetes/
   ```

2. Check the status of the pods:
   ```sh
   kubectl get pods
   ```

3. Access the application:
   ```sh
   kubectl port-forward svc/library-management 3000:3000
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
