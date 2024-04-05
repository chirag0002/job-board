# Job Board Application

This is a web application designed to serve as a job board platform where users can apply for jobs and list their job openings if they are hiring. It provides functionalities for both job seekers and employers.

## Features

- **User Authentication**: Users can sign up, sign in, and sign out securely.
- **Admin Panel**: Admins have access to an admin panel for managing users, job listings, and other administrative tasks.
- **Job Listings**: Users can view all available job listings on the `/jobs` page.
- **Job Application**: Job seekers can apply for listed jobs through the platform.
- **Job Listing**: Employers can list their job openings using the `/update/:jobId` page.
- **Search Functionality**: Users can search for jobs based on name and location.

## Pages

- `/admin`: Admin panel for managing users and job listings.
- `/jobs`: Page displaying all available job listings.
- `/update/:jobId`: Page for employers to update their listed job details.

## Technologies Used

- **Frontend**: Next.js with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB
- **Authentication**: JWT tokens

## Setup Instructions

1. Clone the repository: `git clone https://github.com/chirag0002/job-board`
2. Install dependencies (backend): `cd api && npm install`
3. Install dependencies (frontend): `cd client && npm install`
4. Configure environment variables.
5. Run the application in both folders: `npm run dev`

## Environment Variables

- `PORT`: Port number for running the server.
- `DATABASE_URL`: URL of the MongoDB database.
- `SECRET_KEY`: Secret key for encrypting user sessions.