
Job Scheduler & Automation System

Steps to Run:

1. Create MySQL DB and table:
CREATE DATABASE job_scheduler;
USE job_scheduler;
CREATE TABLE jobs (
 id INT AUTO_INCREMENT PRIMARY KEY,
 taskName VARCHAR(255),
 payload JSON,
 priority VARCHAR(20),
 status VARCHAR(20),
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2. Backend:
cd backend
npm install
node index.js

3. Frontend:
Open frontend/index.html in browser

Webhook:
Replace webhook.site/your-id with your own webhook URL.

AI Used:
ChatGPT (GPT-4) for learning and code assistance.
