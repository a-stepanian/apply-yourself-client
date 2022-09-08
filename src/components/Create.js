import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Create = ({ isDropdownOpen, toggleDropdown }) => {
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

  // This function updates the form state when one of the form input values are changed.
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const url = "https://server-apply-yourself.herokuapp.com/applications/add";
  // const url = "http://localhost:5000/applications/add";

  // This function handles the form submission.
  const onSubmit = async (e) => {
    e.preventDefault();
    // send post request to server
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form }),
    }).catch((error) => {
      console.log(error);
      return;
    });
    // clear form
    setForm({
      company: "",
      position: "",
      website: "",
      location: "",
      applied: "",
      comments: "",
      status: "",
    });
    // redirect to list of all applications page
    navigate("/");
    if (isDropdownOpen) toggleDropdown();
  };

  return (
    <Wrapper>
      <img
        className="clipboard-img"
        src="create.jpg"
        alt="A job application form is next to a pen and laptop"
      />
      <form onSubmit={onSubmit}>
        <h4>Position Details</h4>
        <div className="form-input">
          <label className="label" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
          />
        </div>
        <div className="form-input">
          <label className="label" htmlFor="position">
            Position
          </label>
          <input
            type="text"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-input">
          <label className="label" htmlFor="website">
            Website
          </label>
          <input
            type="text"
            id="website"
            value={form.website}
            onChange={(e) => updateForm({ website: e.target.value })}
          />
        </div>
        <div className="form-input">
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <h4>Application Details</h4>
        <div className="date-input">
          <label className="label" htmlFor="applied">
            Date Applied
          </label>
          <input
            type="date"
            id="applied"
            value={form.applied}
            onChange={(e) => updateForm({ applied: e.target.value })}
          />
        </div>
        <div className="form-input">
          <p className="label">Status</p>
          <div className="radio-buttons">
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
        </div>
        <div className="form-input">
          <label className="label" htmlFor="comments">
            Comments
          </label>
          <textarea
            type="text"
            rows="5"
            id="comments"
            value={form.comments}
            onChange={(e) => updateForm({ comments: e.target.value })}
          />
        </div>
        <button type="submit">Add New Job</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  .clipboard-img {
    object-fit: cover;
    width: 100%;
    max-height: 20rem;
  }
  form {
    width: 100%;
    margin: 1rem;
    padding: 1rem;
    max-width: 30rem;
    h4 {
      margin: 3rem 0 2rem;
      font-weight: 500;
      text-align: center;
    }
    .form-input,
    .date-input {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      input {
        padding: 0.3rem;
      }
    }
    .date-input {
      margin-bottom: 1rem;
      input {
        padding: 0.15rem 0.3rem;
        width: 8.5rem;
        font-size: 1rem;
      }
    }
    .label {
      font-weight: 700;
    }
    .radio-buttons {
      border: 1px solid rgba(0, 0, 0, 0.6);
      border-radius: 1px;
      padding: 0.3rem;
      display: flex;
      justify-content: space-between;
    }
    textarea {
      padding: 0.3rem;
    }
    button {
      width: 100%;
      margin: 2rem 0;
      padding: 1rem;
      border: 1px solid black;
      background-color: var(--beige);
      font-family: "Playfair Display", serif;
      font-weight: 700;
      font-size: 1.1rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default Create;
