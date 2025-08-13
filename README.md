
# NextHire

NextHire is a full-featured job portal web application where **recruiters** and **students** can register, log in, and interact. Recruiters can post job openings, while students can apply for these jobs. The platform manages application statuses and updates profiles in real-time to reflect current activities.

## Live Demo
Render :

frontend : https://nexthire-deployment.onrender.com

backend : https://nexthire-backend-y9o0.onrender.com

netlify : 

frontend : https://next-hire-frontend.netlify.app/

Vercel : 

backend : https://next-hire-backend-xi.vercel.app/

##  Features

### Authentication

- Role-based registration and login for **Students** and **Recruiters**
- Secure session or token-based authentication
- Logout functionality to securely end sessions

### Recruiter Features
- Register and log in as a recruiter
- Create and manage job listings
- View **all applications** for a specific job
- **Accept or reject** student applications
- Edit or update job listings
- View student profiles and resumes
- Logout securely

### Student Features
- Register and log in as a student
- View and update profile: **bio, skills, resume, profile picture**
- Search jobs by **title or keyword**
- Filter jobs by **location, job type, and salary range**
- View **detailed job descriptions**
- **Apply** to jobs with a single click
- **Bookmark/save** jobs for later
- See the **latest job openings** on the homepage
- Track all **applied jobs and their application status**
- Logout securely

### Job Listings
- Real-time job search
- Smart filtering by:
  - **Location**
  - **Type of job** (e.g. Internship, Full-Time, Part-Time)
  - **Salary range**
- Bookmark jobs for later reference
- Stay updated with the latest job postings


## 🛠️ Tech Stack

**Frontend:**
- [HTML, CSS, JavaScript, Tailwind]
- [React.js]

**Backend:**
- [Node.js + Express, cloudinary]

**Database:**
- [MongoDB]

**Authentication:**
- JWT / Sessions


##  Setup & Installation

### 1. Clone the Repository

git clone https://github.com/zeelghori27012004/NextHire

cd NextHire

### 2. Create a .env file in the root of your backend directory with:

MONGO_URI = your_database_url

PORT= port_number

SECRET_KEY = your_secret_key

CLOUD_NAME= your_cloudinary_name

API_KEY= your_cloudinary_API_key

API_SECRET= your_cloudinary_API_secret

### 3. Setup Backend

cd backend

npm install

npm run dev

### 4. Setup Frontend

cd frontend

npm install

npm run dev




