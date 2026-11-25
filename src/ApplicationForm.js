import React, { useState } from "react";
import * as Yup from "yup";
import { supabase } from "./supabaseClient";

function ApplicationForm() {
  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    university: Yup.string().required("University name is required"),
    degree: Yup.string().required("Degree program is required"),   
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [resume, setResume] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    university: "",
    degree: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleResumeChange = (e) => {
  const file = e.target.files[0];

  if (!file) {
    setResume(null);
    return;
  }

  if (file.type !== "application/pdf") {
    alert("Please select a PDF file.");
    e.target.value = "";
    setResume(null);
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Resume size must be less than 5MB.");
    e.target.value = "";
    setResume(null);
    return;
  }

  setResume(file);
};
const handleSubmit = async () => {
  if (!resume) {
    alert("Please upload your PDF resume.");
    return;
  }

  try {
    await validationSchema.validate(formData, {
      abortEarly: false,
    });

    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    submissionData.append("resume", resume);

    const { data, error } = await supabase.functions.invoke(
      "submit-application",
      {
        body: submissionData,
      }
    );

    if (error) throw error;

    alert(data.message || "Application submitted successfully!");

  } catch (error) {
    if (error.inner) {
      const newErrors = {};

      error.inner.forEach((item) => {
        newErrors[item.path] = item.message;
      });

      setErrors(newErrors);
    } else {
      alert(error.message || "Something went wrong.");
    }
  }
};

  // Validate fields for each step
  const validateStep = async (fields) => {
    const newErrors = {};

    for (const field of fields) {
      try {
        await validationSchema.validateAt(field, formData);
      } catch (error) {
        newErrors[field] = error.message;
      }
    }

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      fields.forEach((field) => {
        delete updatedErrors[field];
      });

      return { ...updatedErrors, ...newErrors };
    });

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="application-container">
      <h1>Internship Application Form</h1>

      <p>Step {currentStep} of 3</p>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        ></div>
      </div>

      {/* STEP 1 */}
      {currentStep === 1 && (
        <div>
          <h2>Personal Information</h2>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />

          {errors.full_name && (
            <p className="error">{errors.full_name}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="error">{errors.email}</p>
          )}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <p className="error">{errors.phone}</p>
          )}

          <button
            onClick={async () => {
              const isValid = await validateStep([
                "full_name",
                "email",
                "phone",
              ]);

              if (isValid) {
                setCurrentStep(2);
              }
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <div>
          <h2>Education Details</h2>

          <input
            type="text"
            name="university"
            placeholder="University Name"
            value={formData.university}
            onChange={handleChange}
          />

          {errors.university && (
            <p className="error">{errors.university}</p>
          )}

          <input
            type="text"
            name="degree"
            placeholder="Degree Program"
            value={formData.degree}
            onChange={handleChange}
          />

          {errors.degree && (
            <p className="error">{errors.degree}</p>
          )}

          <button onClick={() => setCurrentStep(1)}>
            Back
          </button>

          <button
            onClick={async () => {
              const isValid = await validateStep([
                "university",
                "degree",
              ]);

              if (isValid) {
                setCurrentStep(3);
              }
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div>
          <h2>Resume Upload</h2>

          <input
  type="file"
  accept=".pdf,application/pdf"
  onChange={handleResumeChange}
/>
{resume && (
  <p>
    Selected Resume: {resume.name}
  </p>
)}

          <button onClick={() => setCurrentStep(2)}>
            Back
          </button>

          <button onClick={handleSubmit}>
  Submit Application
</button>
        </div>
      )}
    </div>
  );
}

export default ApplicationForm;