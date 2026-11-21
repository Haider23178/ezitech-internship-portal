Ezitech Internship Application System

A React-based internship application portal with a Supabase backend. The system is designed to allow applicants to submit applications, upload resumes, and track their application status while HR administrators manage applications securely.

1. Technologies Used

- React.js
- JavaScript
- HTML
- CSS
- Supabase
- PostgreSQL
- Supabase Storage
- Node.js
- Git and GitHub

2. Database Design

The Supabase backend contains three main tables:

Applicants

Stores applicant information:

- Applicant ID
- User ID
- Full Name
- Email
- Phone
- University
- Degree
- Resume URL
- Application Status
- Created At

Resumes

Stores resume file metadata:

- Resume ID
- Applicant ID
- File Name
- Storage Path
- Uploaded At

Status Logs

Stores application status history:

- Log ID
- Applicant ID
- Previous Status
- New Status
- Changed By
- Changed At

3. Entity Relationship Diagram (ERD)

Supabase Auth Users
        |
        | 1:1
        |
    Applicants
        |
        | 1:M
        |
   +----+----+
   |         |
 Resumes  Status Logs

- One applicant can have multiple resume records.
- One applicant can have multiple status history records.
- An applicant account is linked to a Supabase Auth user.

4. Supabase Storage

A private Storage bucket named "resumes" stores applicant resume PDFs.

Files are organized into folders using the applicant's authenticated user ID.

5. Security and RLS Policies

Row Level Security (RLS) is enabled on all three database tables.

- Applicants can view their own applicant records.
- Applicants can submit their own applications.
- Applicants can view and add their own resume metadata.
- Applicants can view their own application status history.
- Admins can manage all applicant, resume, and status records.
- Admins can manage resume files.
- Applicants can upload and download only their own resume files.

Admin access is identified using the "role" value in Supabase "app_metadata".

6. Sample Data

A Node.js script generates at least 10 sample applicant records.

Script location:

scripts/seedApplicants.js

Run the script using:

node scripts/seedApplicants.js

The script uses local environment variables from ".env.seed". Never upload this file or the Supabase secret key to GitHub.

7. Project Structure

internship-portal/
│
├── public/
├── src/
├── scripts/
│   └── seedApplicants.js
├── supabase/
│   ├── schema.sql
│   └── policies.sql
├── .env.seed
├── .gitignore
├── package.json
└── README.md

8. Local Setup

1. Install Node.js.
2. Clone the GitHub repository.
3. Open the project folder in VS Code.
4. Install dependencies:

npm install

5. Configure your Supabase credentials in the appropriate local environment files.
6. Start the React application:

npm start

9. Task 1 Deliverables

- Supabase database tables created.
- Private resume Storage bucket configured.
- Row Level Security policies created.
- At least 10 sample applicant records generated.
- SQL schema and policy files added to the repository.
- README documentation updated.

10. Security Note

Never commit ".env.seed", ".env.local", Supabase secret keys, or service-role keys to GitHub.