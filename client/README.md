Here’s the full `README.md` content for your Micro-SaaS – Link Analytics Dashboard project:

```markdown
# Micro-SaaS – Link Analytics Dashboard

## Description

This project is a full-stack URL shortener and analytics dashboard, similar to Bitly, allowing users to shorten URLs, track clicks, locations, and devices. The app features user authentication, link creation, and an analytics dashboard for monitoring link performance.

## Features

1. **Authentication**
   - Login using email and password with JWT.
   - Each user can track their own links.
   - Supports multi-user link tracking by saving user ID with each shortened link.

2. **Create Short Link**
   - Users can shorten any long URL.
   - Custom alias (optional) and expiration date (optional) can be specified for the shortened link.

3. **Analytics Dashboard**
   - View a table with details about shortened links:
     - Original URL
     - Shortened URL
     - Total Clicks
     - Created Date
     - Expiration Status
   - View analytics charts showing:
     - Clicks over time (line or bar charts).
     - Device/browser breakdown of visitors.

4. **Async Integration**
   - Redirect users to the original URL on click.
   - Asynchronously log data (device type, IP, timestamp, etc.) into MongoDB to track link visits.

5. **Bonus Features**
   - QR Code Generator for each short URL.
   - Pagination and search functionality on the dashboard to manage links effectively.

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, TailwindCSS, Chart.js or Recharts
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## Prerequisites

- **Node.js** (v16 or later)
- **MongoDB** (local or cloud instance, e.g., MongoDB Atlas)

## Installation

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/micro-saas-url-shortener.git
   cd micro-saas-url-shortener
   ```

2. Navigate to the `backend` folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Configure environment variables in the `backend/.env` file. **Ensure that you keep sensitive information secure and do not push credentials to the public repo**. You should manually add these values after cloning the project.

   Example `.env` configuration for the backend:
   ```env
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   BASE_URL=http://localhost:5000
   CLIENT_URL=http://localhost:5173
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:

   ```bash
   npm run server
   ```

   This will start the backend on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in the `frontend/.env` file:

   Example `.env` configuration for the frontend:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   VITE_BASE_URL=http://localhost:5000/api/v1/links
   VITE_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   This will start the frontend on `http://localhost:5173`.

### Running the Application

1. Ensure MongoDB is running (either locally or with a cloud service like MongoDB Atlas).
2. Start the backend server (`npm run server`).
3. Start the frontend server (`npm run dev`).
4. Open the application in your browser at `http://localhost:5173`.

### Testing

You can test the app with the following hardcoded credentials:

- **Email**: intern@dacoid.com
- **Password**: Test123

### Deployment

- The **backend** can be deployed using services like Heroku, Render, or DigitalOcean.
- The **frontend** can be deployed using platforms like Vercel or Netlify.

### Additional Notes

- The JWT secret and MongoDB URI should not be shared publicly. Use environment variables for secure storage.
- Ensure that the backend and frontend URLs match in the respective `.env` files.






