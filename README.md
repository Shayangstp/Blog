
## Blogging Platform with Next.js

# Requirements

-Node.js (v14 or later)
-Next.js (v13 or later)
-MongoDB (or another database of your choice)
-Tailwind CSS for styling (optional)


# Run project on your local 

```bash

git clone https://github.com/Shayangstp/Blog

cd to-your-project

# add your mongoDb URL(URI)

npm install

npm run dev 

```

# For runnig test 

```bash

npm test 

```

# Overview

This project is a simple yet powerful blogging platform built with Next.js. The platform allows users to create, read, update, and delete (CRUD) blog posts. The project demonstrates a full-stack application with a modern frontend, robust backend API routes, and a connected database.

# Features

-Homepage: Displays a list of all blog posts with titles and brief descriptions.

-Blog Post Details: A detailed view of individual blog posts with full content.

-Navigation Bar: Easy navigation between the homepage and other sections.

-CRUD Operations:
Create new blog posts.
Read (view) all blog posts or a specific one.
Update existing blog posts.
Delete blog posts.

-Responsive Design: The application is styled for a visually appealing and user-friendly interface using Tailwind CSS.

-API Routes: Backend API routes for handling all CRUD operations, built with Next.js API routes.

-Validation: Input validation to ensure that the blog post title and content are not empty, with appropriate error handling.

-Unit Testing: Comprehensive tests for API routes and utility functions using Jest.

-Deployment: The application is deployed on Vercel, making it accessible online.


# how deploy on vercel :

-Push your project to a Git repository (GitHub, GitLab, etc.).
-Connect the repository to Vercel using their dashboard.
-Configure environment variables on Vercel for the database connection and make interigation with mongoDB dashboard on vercel.
-Deploy the application.
