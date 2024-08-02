import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import styled from "styled-components";
import { LineDesign } from "../components/LineDesign";
import { useAppContext, url } from "../context/AppContext";

export const NewAppPage = () => {
  const [form, setForm] = useState({
    company: "",
    position: "",
    website: "",
    location: "",
    applied: "",
    response: "",
    comments: "",
    status: ""
  });
  const navigate = useNavigate();
  const { fetchApplications, loggedIn, isDropdownOpen, toggleDropdown } = useAppContext();

  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // This function handles the form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newApplication = {
      company: form.company,
      position: form.position,
      website: form.website,
      location: form.location,
      applied: form.applied,
      response: form.response,
      comments: form.comments,
      status: form.status
    };
    // send post request to server
    await fetch(`${url}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newApplication),
      credentials: "include"
    }).catch(error => {
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
      response: "",
      comments: "",
      status: ""
    });

    // Refresh the applications array in context after adding the new app
    fetchApplications();

    // redirect to list of all applications page
    navigate("/dashboard");
    if (isDropdownOpen) toggleDropdown();
  };

  return (
    <Wrapper>
      <section className="form-section">
        <LineDesign />
        <h4>Add Application</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label className="label" htmlFor="company">
              Company
            </label>
            <input required={true} id="company" name="company" value={form.company} onChange={e => updateForm(e)} />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="position">
              Position
            </label>
            <input required={true} id="position" name="position" value={form.position} onChange={e => updateForm(e)} />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="website">
              Website
            </label>
            <input required={true} id="website" name="website" value={form.website} onChange={e => updateForm(e)} />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="location">
              Location
            </label>
            <input required={true} id="location" name="location" value={form.location} onChange={e => updateForm(e)} />
          </div>
          <div className="date-and-status">
            <div className="date-input">
              <label className="label" htmlFor="applied">
                Date Applied
              </label>
              <input
                required={true}
                type="date"
                id="applied"
                name="applied"
                value={form.applied}
                onChange={e => updateForm(e)}
              />
            </div>
            <div className="form-input">
              <p className="label">Status</p>
              <div className="radio-buttons">
                <div className="button-wrapper">
                  <input
                    required={true}
                    type="radio"
                    id="positionApplied"
                    name="positionApplied"
                    value="Applied"
                    checked={form.status === "Applied"}
                    onChange={e => updateForm(e)}
                  />
                  <label htmlFor="positionApplied">Applied</label>
                </div>
                <div className="button-wrapper">
                  <input
                    required={true}
                    type="radio"
                    id="positionDeclined"
                    name="positionDeclined"
                    value="Declined"
                    checked={form.status === "Declined"}
                    onChange={e => updateForm(e)}
                  />
                  <label htmlFor="positionDeclined">Declined</label>
                </div>
                <div className="button-wrapper">
                  <input
                    required={true}
                    type="radio"
                    id="positionInterview"
                    name="positionInterview"
                    value="Interview"
                    checked={form.status === "Interview"}
                    onChange={e => updateForm(e)}
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
            <textarea rows={3} id="comments" name="comments" value={form.comments} onChange={e => updateForm(e)} />
          </div>
          <button type="submit">Add New Job</button>
        </form>
      </section>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .form-section {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h4 {
    z-index: 1;
    position: relative;
    margin: 5rem 1rem 1rem;
    font-weight: 500;
    font-size: 2.4rem;
    text-align: center;
  }
  form {
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.2);
    border-radius: 3px;
    position: relative;
    width: 100%;
    max-width: 20rem;
    margin: 1rem 1rem 5rem;
    padding: 2rem;
    .form-input {
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: column;
      input {
        padding: 0.2rem 0.3rem 0.1rem;
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 1px;
      }
    }
    .label {
      font-size: 0.8rem;
      font-weight: 700;
    }
    button {
      color: black;
      width: 100%;
      margin: 1rem 0;
      padding: 1rem;
      border: 2px solid rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      background-color: rgba(215, 210, 255, 0.5);
      font-family: "Playfair Display", serif;
      font-weight: 700;
      &:hover {
        cursor: pointer;
        background-color: rgba(215, 210, 255, 1);
      }
    }
  }
`;
