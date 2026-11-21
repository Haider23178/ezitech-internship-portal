import { supabase } from "./supabaseClient";
import React from "react";


import "./App.css";

function App() {
  const testConnection = async () => {
    const { data, error } = await supabase
      .from("applicants")
      .select("*");

    if (error) {
      console.log("Supabase Error:", error.message);
    } else {
      console.log("Supabase Connected Successfully!", data);
    }
  };
  return (
    <div className="App">
      <nav className="navbar">
        <h2>Internship Portal</h2>
        <div>
          <a href="/">Home</a>
          <a href="/apply">Apply Now</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Start Your Career With Us</h1>

        <p>
          Explore internship opportunities, apply online,
          and track your application status.
        </p>

       <div className="hero-buttons">
  <button>Apply for Internship</button>

  <button onClick={testConnection}>
    Test Supabase Connection
  </button>
</div>
      </section>

      <section className="features">
        <h2>Why Join Our Internship Program?</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>Easy Application</h3>
            <p>Submit your internship application online.</p>
          </div>

          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Check your application status anytime.</p>
          </div>

          <div className="feature-card">
            <h3>Career Growth</h3>
            <p>Develop your skills and gain experience.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Internship Application System</p>
      </footer>
    </div>
  );
}

export default App;