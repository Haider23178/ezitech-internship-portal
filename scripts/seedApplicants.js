require("dotenv").config({ path: ".env.seed" });

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

const applicants = [
{ full_name: "Ali Khan", email: "ali.khan@example.com", phone: "03001234567", university: "Riphah International University", degree: "BS Software Engineering" },
{ full_name: "Sara Ahmed", email: "sara.ahmed@example.com", phone: "03011234567", university: "FAST University", degree: "BS Computer Science" },
{ full_name: "Usman Malik", email: "usman.malik@example.com", phone: "03021234567", university: "COMSATS University", degree: "BS Information Technology" },
{ full_name: "Ayesha Noor", email: "ayesha.noor@example.com", phone: "03031234567", university: "NUST", degree: "BS Software Engineering" },
{ full_name: "Hamza Ali", email: "hamza.ali@example.com", phone: "03041234567", university: "Air University", degree: "BS Computer Science" },
{ full_name: "Fatima Zahra", email: "fatima.zahra@example.com", phone: "03051234567", university: "Bahria University", degree: "BS Information Technology" },
{ full_name: "Ahmed Raza", email: "ahmed.raza@example.com", phone: "03061234567", university: "University of Punjab", degree: "BS Software Engineering" },
{ full_name: "Maham Iqbal", email: "maham.iqbal@example.com", phone: "03071234567", university: "IIUI", degree: "BS Computer Science" },
{ full_name: "Bilal Hussain", email: "bilal.hussain@example.com", phone: "03081234567", university: "UET Lahore", degree: "BS Information Technology" },
{ full_name: "Zainab Tariq", email: "zainab.tariq@example.com", phone: "03091234567", university: "Riphah International University", degree: "BS Software Engineering" }
];

async function seedApplicants() {
const { data, error } = await supabase
.from("applicants")
.upsert(applicants, { onConflict: "email" })
.select();

if (error) {
console.error("Error inserting applicants:", error.message);
process.exitCode = 1;
return;
}
console.log(`Successfully inserted/updated ${data.length} sample applicants!`);
}

seedApplicants();