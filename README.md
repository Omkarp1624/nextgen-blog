# Next.js & MongoDB Dynamic Blog Platform

A fully functional, high-performance blog platform built with Next.js and MongoDB, featuring dynamic content, a real-time search, and a rich-text editing admin panel.

*Developed by Omkar Patil.*

---

## 📝 Project Overview

This project is a modern blog platform where all content is fetched directly from a MongoDB database, rather than from static Markdown files. It uses **Incremental Static Regeneration (ISR)** to provide the performance benefits of a static site with the flexibility of a server-rendered application, allowing content to be updated without needing a full site rebuild.

This project was built to fulfill the requirements of a web developer assignment, demonstrating proficiency in modern web technologies and best practices.

---

## ✨ Key Features

* **Dynamic Content**: All blog posts are managed and served directly from a MongoDB database using Mongoose.
* **High Performance**: Leverages Next.js Incremental Static Regeneration (`revalidate`) for incredibly fast page loads and efficient data fetching.
* **Real-time Search**: A responsive search bar on the homepage allows users to instantly filter posts by title.
* **Admin Panel**: A simple and clean interface at `/admin/create` to create new blog posts with a convenient link from the homepage.
* **Rich Text Editing**: Integrates the `react-quill` editor for an intuitive and powerful content writing experience.
* **REST API**: Exposes API endpoints to fetch all posts (`/api/blogs`) and single posts (`/api/blogs/[slug]`).

---

## 🛠️ Tech Stack

* **Framework**: Next.js 14
* **Database**: MongoDB
* **ODM**: Mongoose
* **Styling**: Tailwind CSS
* **Rich Text Editor**: React Quill
* **Date Formatting**: `date-fns`

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your computer:
* [Node.js](https://nodejs.org/en/) (v16.x or newer)
* An active [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database.

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Omkarp1624/nextgen-blog.git](https://github.com/Omkarp1624/nextgen-blog.git)
    cd nextgen-blog
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env.local` in the root of the project and add the following variables.

    ```env
    # MongoDB Connection String from your MongoDB Atlas dashboard
    # Make sure your IP is whitelisted and the password is correct
    MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

    # A secret key to protect the admin API endpoint
    # The value for both keys must be identical
    ADMIN_SECRET_KEY=your_secret_password
    NEXT_PUBLIC_ADMIN_SECRET_KEY=your_secret_password
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
    The page to create new posts is available via the link on the homepage or at [http://localhost:3000/admin/create](http://localhost:3000/admin/create).

---

## 🤖 Disclosure of AI Tool Usage

This project was developed with significant assistance from Google's Gemini. The AI served as a development partner for tasks including: outlining the project architecture, generating boilerplate code for components and API routes, collaboratively debugging a series of complex database connection and environment issues, and writing this documentation. The development process was a collaborative effort between the developer and the AI.