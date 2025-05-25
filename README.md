Project Preparation

Clone the Repository

git clone <your-repo-url>
cd vendon-task

Install Dependencies

npm install

🧪 Development & Testing Setup
Linting and Formatting
Make sure ESLint and Prettier are functional:

npm run lint

Run Tests

npm run test

Make sure jest runs with no errors. JSDOM is set as the test environment.

⚙️ Build and Serve
8. Build the Project

npm run build

This runs both TypeScript compilation and Vite build.

9. Preview the Build

npm run preview

Vite will serve the production build on a local port (default: http://localhost:4173).

