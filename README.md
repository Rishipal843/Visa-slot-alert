# Visa Alerts Admin Tool

A streamlined internal application designed to track and manage visa appointment alerts.

---

 <!-- Setup Steps -->

### Prerequisites
* Node.js: v18+ recommended
* MongoDB: Local or Cloud
* Git

 <!-- Backend Setup -->
1. `cd backend`
2. `npm install`
3. Create a `.env` file with:
    `PORT=5000`
    `MONGO_URI=mongodb://localhost:27017/visa-alerts`
4. `npm start` (Runs at http://localhost:5000)

 <!-- Frontend Setup -->
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs at http://localhost:5173)

---

 <!-- Design Decisions -->
* No Authentication: 
    Internal-only tool; skipped to keep the system simple.

* MongoDB with Mongoose:
    Chosen for flexibility; uses native `_id` as the alert ID.

* Status-Based Workflow: 
    Active → Booked → Expired.

* RESTful API: 
    Clear separation using routes, controllers, and models.

* Minimal UI: 
    Clean admin interface prioritizing function over visuals.

---

 <!-- Future Production Improvements -->
* Security: JWT-based Auth and Role-Based Access Control (RBAC).
* Automation: Cron jobs or scraping APIs for real-time slot detection.
* Alerting: Email (Nodemailer) or WhatsApp (Twilio) notifications.
* DevOps: Docker and CI/CD pipelines.

---

<!--  Human-AI Collaboration -->

### AI Helped With
* Improving code structure and readability
* Suggesting best practices for Express and React
* Formatting and refining README documentation

### I Had to Think About
* Understanding the real-world visa alert workflow
* Deciding correct status transitions (Active → Booked → Expired)
* Designing a realistic internal admin tool
* Choosing what not to build (e.g., login, overengineering)
* Mapping business needs to API and UI behavior