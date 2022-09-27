import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LineDesign from "../components/LineDesign";
import AuthContext from "../context/AuthContext";

const NewAppPage = ({ isDropdownOpen, toggleDropdown }) => {
  const [form, setForm] = useState({
    company: "",
    position: "",
    website: "",
    location: "",
    applied: "",
    response: "",
    comments: "",
    status: "",
  });
  const navigate = useNavigate();
  const { fetchApplications, url } = useContext(AuthContext);
  const { id } = useParams();

  // This function updates the form state when one of the form input values are changed.
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  // Populate the form input states with existing values
  useEffect(() => {
    const fetchFormData = async () => {
      const foundApplication = await fetch(`${url}/applications/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).catch((error) => {
        console.log(error);
        return;
      });
      const data = await foundApplication.json();
      const {
        company,
        position,
        website,
        location,
        applied,
        response,
        comments,
        status,
      } = data;
      setForm({
        company,
        position,
        website,
        location,
        applied,
        response,
        comments,
        status,
      });
    };
    fetchFormData();
  }, [id]);

  // This function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedApplication = {
      company: form.company,
      position: form.position,
      website: form.website,
      location: form.location,
      applied: form.applied,
      response: form.response,
      comments: form.comments,
      status: form.status,
    };
    // send post request to server
    console.log("updated app: ", updatedApplication);
    console.log("url sending put reqest to: ", updatedApplication);
    await fetch(`${url}/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedApplication),
      credentials: "include",
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
      response: "",
      comments: "",
      status: "",
    });

    fetchApplications();

    // redirect to list of all applications page
    navigate(`/applications`);
    if (isDropdownOpen) toggleDropdown();
  };

  return (
    <Wrapper>
      <section className="form-section">
        <LineDesign />
        <h4>Edit Application</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label className="label" htmlFor="company">
              Company
            </label>
            <input
              required="yes"
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
              required="yes"
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
              required="yes"
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
              required="yes"
              type="text"
              id="location"
              value={form.location}
              onChange={(e) => updateForm({ location: e.target.value })}
            />
          </div>
          <div className="date-and-status">
            <div className="date-input">
              <label className="label" htmlFor="applied">
                Date Applied
              </label>
              <input
                required="yes"
                type="date"
                id="applied"
                value={form.applied}
                onChange={(e) => updateForm({ applied: e.target.value })}
              />
            </div>
            <div className="date-input">
              <label className="label" htmlFor="response">
                Company Response
              </label>
              <input
                type="date"
                id="response"
                value={form.response}
                onChange={(e) => updateForm({ response: e.target.value })}
              />
            </div>
            <div className="form-input">
              <p className="label">Status</p>
              <div className="radio-buttons">
                <div className="button-wrapper">
                  <input
                    required="yes"
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
                    required="yes"
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
                    required="yes"
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
              rows="3"
              id="comments"
              value={form.comments}
              onChange={(e) => updateForm({ comments: e.target.value })}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </section>
    </Wrapper>
  );
};

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

export default NewAppPage;
