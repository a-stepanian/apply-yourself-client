import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LineDesign } from "../components/LineDesign";
import { useAppContext, url } from "../context/AppContext";
import styled from "styled-components";

export interface IApplicationForm {
  company: string;
  position: string;
  website: string;
  location: string;
  applied: string;
  response: string;
  comments: string;
  status: "Submitted" | "Applied" | "Interview" | "Declined" | "";
}

export const EditAppPage = () => {
  const [form, setForm] = useState<IApplicationForm>({
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
  const { id } = useParams();

  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  // This function updates the form state when one of the form input values are changed.
  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return setForm(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Populate the form input states with existing values
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const foundApplication = await fetch(`${url}/applications/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await foundApplication.json();
        const { company, position, website, location, applied, response, comments, status } = data;
        setForm({
          company,
          position,
          website,
          location,
          applied,
          response,
          comments,
          status
        });
      } catch (e) {
        console.log(e);
        return;
      }
    };
    fetchFormData();
    // eslint-disable-next-line
  }, [id]);

  // This function handles the form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, form: IApplicationForm) => {
    e.preventDefault();
    const updatedApplication = {
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
    console.log("updated app: ", updatedApplication);
    console.log("url sending put reqest to: ", updatedApplication);
    await fetch(`${url}/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedApplication),
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

    await fetchApplications();

    // redirect to list of all applications page
    navigate(`/dashboard`);
    if (isDropdownOpen) toggleDropdown();
  };

  return (
    <Wrapper>
      <section className="form-section">
        <LineDesign />
        <h4>Edit Application</h4>
        <form onSubmit={e => handleSubmit(e, form)}>
          <div className="form-input">
            <label className="label" htmlFor="company">
              Company
            </label>
            <input
              required={true}
              type="text"
              id="company"
              name="company"
              value={form.company}
              onChange={e => updateForm(e)}
            />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="position">
              Position
            </label>
            <input
              required={true}
              type="text"
              id="position"
              name="position"
              value={form.position}
              onChange={e => updateForm(e)}
            />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="website">
              Website
            </label>
            <input
              required={true}
              type="text"
              id="website"
              name="website"
              value={form.website}
              onChange={e => updateForm(e)}
            />
          </div>
          <div className="form-input">
            <label className="label" htmlFor="location">
              Location
            </label>
            <input
              required={true}
              type="text"
              id="location"
              name="location"
              value={form.location}
              onChange={e => updateForm(e)}
            />
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
            <div className="date-input">
              <label className="label" htmlFor="response">
                Company Response
              </label>
              <input type="date" id="response" name="response" value={form.response} onChange={e => updateForm(e)} />
            </div>
            <div className="form-input">
              <p className="label">Status</p>
              <div className="radio-buttons">
                <div className="button-wrapper">
                  <input
                    required={true}
                    type="radio"
                    name="status"
                    id="positionApplied"
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
                    name="status"
                    id="positionDeclined"
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
                    name="status"
                    id="positionInterview"
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
          <button type="submit">Save</button>
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

      font-weight: 700;
      &:hover {
        cursor: pointer;
        background-color: rgba(215, 210, 255, 1);
      }
    }
  }
`;
