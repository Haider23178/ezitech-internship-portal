Ezitech Internship Application System

A React-based internship application portal built with React.js and Supabase. The portal allows applicants to submit internship applications through a multi-step form, upload PDF resumes, and securely store application information.

1. Technologies Used

- React.js
- JavaScript
- HTML
- CSS
- Yup (Form Validation)
- Supabase
- PostgreSQL
- Supabase Storage
- Supabase Edge Functions
- Node.js
- Git and GitHub

2. Project Features

- Multi-step application form
- Personal information section
- Education details section
- Resume upload section
- Progress bar
- Client-side form validation using Yup
- PDF resume validation
- Maximum resume file size of 5MB
- Application submission through Supabase Edge Function
- Private resume storage
- Application data saved in Supabase
- Resume metadata stored in database
- Submission success message
- Duplicate email protection
- IP-based submission rate-limiting mechanism

3. Database Design

The Supabase database contains the following main tables:

Applicants

Stores applicant information:

- Applicant ID
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

Submission Rate Limits

Stores hashed IP identifiers and submission timestamps to support rate limiting.

4. Entity Relationship Diagram (ERD)

Applicants
    |
    | 1:M
    |
   +----+----+
   |         |
 Resumes  Status Logs

- One applicant can have multiple resume records.
- One applicant can have multiple status history records.

5. Supabase Storage

A private Storage bucket named "resumes" stores applicant resume PDF files.

Resume files are uploaded through the Supabase Edge Function during application submission.

The bucket is private to help protect applicant documents.

6. Application Submission

The application form guides applicants through three steps:

1. Personal Information
2. Education Details
3. Resume Upload

After completing the form, applicants submit their information.

The Supabase Edge Function:

- Processes application submissions.
- Validates submission-related conditions.
- Inserts applicant information into the database.
- Uploads the resume PDF to private Supabase Storage.
- Saves resume metadata.
- Returns a success response to the React application.

7. Security

Security features implemented include:

- Row Level Security (RLS).
- Private resume Storage bucket.
- Supabase Edge Function for application submission.
- Service-role key restricted to the server-side Edge Function.
- Duplicate email protection.
- IP-based rate-limiting mechanism.
- PDF file validation.
- Maximum file size validation.

The Supabase service-role key must never be exposed in the React frontend or committed to GitHub.

8. Rate Limiting

A database-based rate-limiting mechanism is implemented to restrict submission attempts.

The system is designed to allow a maximum of three submission attempts per IP address within one hour.

IP addresses are hashed before being stored in the rate-limit table.

9. Sample Data

A Node.js script generates sample applicant records.

Script location:

scripts/seedApplicants.js

Run the script using:

node scripts/seedApplicants.js

The script uses local environment variables.

Never upload environment files containing secret keys to GitHub.

10. Project Structure

internship-portal/
│
├── public/
├── src/
│   ├── ApplicationForm.js
│   └── ...
├── scripts/
│   └── seedApplicants.js
├── supabase/
│   ├── schema.sql
│   └── policies.sql
├── .env.seed
├── .gitignore
├── package.json
└── README.md

11. Local Setup

1. Install Node.js.
2. Clone the repository.
3. Open the project folder in VS Code.
4. Install dependencies:

npm install

5. Configure the required local environment variables.
6. Start the React application:

npm start

The application normally runs at:

http://localhost:3001

12. Task Deliverables

Task 1: Database Design and Supabase Configuration

- Supabase database schema.
- Applicants, resumes, and status logs tables.
- Row Level Security configuration.
- Private resumes Storage bucket.
- Sample applicant data.
- SQL schema and policy files.

Task 2: Multi-Step Application Form

- Three-step application form.
- Progress bar.
- Personal information.
- Education details.
- Resume PDF upload.
- Yup validation.
- Supabase Edge Function integration.
- Applicant information saved to database.
- Resume uploaded to private Storage.
- Resume metadata saved in database.
- Submission success message.

13. Security Note

Never commit the following to GitHub:

- ".env"
- ".env.local"
- ".env.seed"
- Supabase service-role keys
- Passwords
- Private credentials

Always keep sensitive credentials in secure environment variables.