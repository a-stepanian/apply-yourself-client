import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [form, setForm] = useState({
    company: "",
    position: "",
    website: "",
    location: "",
    applied: "",
    comments: "",
    status: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  // This function will handle the submission.
  const onSubmit = async (e) => {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newApplication = { ...form };

    await fetch("http://localhost:5000/applications/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApplication),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      company: "",
      position: "",
      website: "",
      location: "",
      applied: "",
      comments: "",
      status: "",
    });
    navigate("/");
  };

  // This following section will display the form that takes the input from the user.
  return (
    <section>
      <h3>Create New Job Application Record</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={form.website}
            onChange={(e) => updateForm({ website: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="applied">Date Applied</label>
          <input
            type="text"
            id="applied"
            value={form.applied}
            onChange={(e) => updateForm({ applied: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="comments">Comments</label>
          <textarea
            type="text"
            id="comments"
            value={form.comments}
            onChange={(e) => updateForm({ comments: e.target.value })}
          />
        </div>
        <div>
          <h4>Application Status</h4>
          <div>
            <input
              type="radio"
              name="positionOptions"
              id="positionApplied"
              value="Applied"
              checked={form.status === "Applied"}
              onChange={(e) => updateForm({ status: e.target.value })}
            />
            <label htmlFor="positionApplied">Applied</label>
          </div>
          <div>
            <input
              type="radio"
              name="positionOptions"
              id="positionRejected"
              value="Rejected"
              checked={form.status === "Rejected"}
              onChange={(e) => updateForm({ status: e.target.value })}
            />
            <label htmlFor="positionRejected">Rejected</label>
          </div>
          <div>
            <input
              type="radio"
              name="positionOptions"
              id="positionInterview"
              value="Interview"
              checked={form.status === "Interview"}
              onChange={(e) => updateForm({ status: e.target.value })}
            />
            <label htmlFor="positionInterview">Interview</label>
          </div>
        </div>
        <div>
          <input type="submit" value="Add Job Application Details" />
        </div>
      </form>
    </section>
  );
};

export default Create;
