import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import LineDesign from "./LineDesign";
import { GrEdit } from "react-icons/gr";

const Edit = () => {
  const [form, setForm] = useState({
    company: "",
    position: "",
    website: "",
    location: "",
    applied: "",
    comments: "",
    status: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  const url = "https://server-apply-yourself.herokuapp.com/applications/";
  // const url = "http://localhost:5000/applications/";

  useEffect(() => {
    const fetchApplication = async () => {
      const id = params.id.toString();
      const response = await fetch(`${url}${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    };
    fetchApplication();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedApplication = {
      company: form.company,
      position: form.position,
      website: form.website,
      location: form.location,
      applied: form.applied,
      comments: form.comments,
      status: form.status,
    };
    await fetch(`${url}${params.id}`, {
      method: "PUT",
      body: JSON.stringify(editedApplication),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/applications");
  };

  return (
    <Wrapper>
      <section>
        <GrEdit className="icon" />
        <h2>Edit Application</h2>
        <LineDesign />
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
          <h4>Application Details</h4>
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
                    id="positionRejected"
                    value="Rejected"
                    checked={form.status === "Rejected"}
                    onChange={(e) => updateForm({ status: e.target.value })}
                  />
                  <label htmlFor="positionRejected">Rejected</label>
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
          <button type="submit">Save Changes</button>
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
  .icon {
    position: relative;
    z-index: 1;
    margin-top: 5rem;
    font-size: 3rem;
    font-weight: 100;
    text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3);
  }
  h2 {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    font-size: 2.4rem;
    font-weight: 100;
    text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3);
  }
  .img-container {
    width: 100%;
    height: 15rem;
  }
  .clipboard-img {
    object-fit: cover;
    width: 100%;
    height: 15rem;
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
      margin: 5rem 0 1rem;
      border-bottom: 1px solid var(--beige2);
      font-weight: 500;
      text-align: center;
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

export default Edit;
