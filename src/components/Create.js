import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LineDesign from "./LineDesign";

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

  // const url = "https://server-apply-yourself.herokuapp.com/applications/new";
  const url = "http://localhost:5000/applications/new";

  // This function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // send post request to server
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
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
    navigate("/applications");
    if (isDropdownOpen) toggleDropdown();
  };

  return (
    <Wrapper>
      <header className="img-container">
        <img
          className="clipboard-img"
          src="/create.jpg"
          alt="A job application form is next to a pen and laptop"
        />
      </header>
      <section>
        <LineDesign />
        <form onSubmit={handleSubmit}>
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
              type="url"
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
          <h4 className="app-h4">Application Details</h4>
          <div className="date-and-status">
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
                <div className="button-wrapper">
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
                <div className="button-wrapper">
                  <input
                    type="radio"
                    name="positionOptions"
                    id="positionDeclined"
                    value="Declined"
                    checked={form.status === "Declined"}
                    onChange={(e) => updateForm({ status: e.target.value })}
                  />
                  <label htmlFor="positionDeclined">Declined</label>
                </div>
                <div className="button-wrapper">
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
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  .img-container {
    width: 100%;
    height: 10rem;
  }
  .clipboard-img {
    object-fit: cover;
    width: 100%;
    height: 10rem;
  }
  section {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form {
    z-index: 1;
    position: relative;
    width: 100%;
    margin: 1rem;
    padding: 1rem;
    max-width: 30rem;
    h4 {
      margin: 3rem 0 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--beige2);
      font-weight: 500;
      font-size: 2rem;
      text-align: center;
    }
    .app-h4 {
      margin-top: 5rem;
    }
    .form-input,
    .date-input {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      input {
        padding: 0.4rem;
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 1px;
      }
    }
    .date-input {
      margin-bottom: 1rem;
      input {
        background-color: white;
        padding: 0.2rem;
        width: 8.5rem;
        font-size: 1rem;
        font-family: "Playfair Display", serif;
      }
    }
    .date-and-status {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .label {
      font-weight: 700;
    }
    .radio-buttons {
      background-color: white;
      border: 1px solid rgba(0, 0, 0, 0.6);
      border-radius: 1px;
      padding: 0.3rem;
      display: flex;
      justify-content: space-around;
    }
    .button-wrapper {
      margin: 0 0.5rem;
    }
    textarea {
      border-radius: 2px;
      padding: 0.3rem;
    }
    button {
      color: black;
      width: 100%;
      margin: 4rem 0;
      padding: 1rem;
      border: 2px solid rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      background-color: rgba(215, 210, 255, 0.5);
      font-family: "Playfair Display", serif;
      font-weight: 700;
      font-size: 1.1rem;
      &:hover {
        cursor: pointer;
        background-color: rgba(215, 210, 255, 1);
      }
    }
  }

  @media (min-width: 480px) {
    form {
      .date-and-status {
        flex-direction: row;
      }
    }
  }
`;

export default Create;
