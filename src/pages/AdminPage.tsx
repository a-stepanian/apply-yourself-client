import { useEffect, useState } from "react";
import styled from "styled-components";
import { url } from "../context/AppContext";
import { IHasName } from "../interfaces/interfaces";
import { FaTrashAlt } from "react-icons/fa";
import { Loading } from "../components/Loading";

export const AdminPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [companyInput, setCompanyInput] = useState<string>("");
  const [industriesInput, setIndustriesInput] = useState<string>("");
  const [locationsInput, setLocationsInput] = useState<string>("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);

  const getAllCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/company`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("GET to /companies response was not ok!!!!");
      }
      const data = await response.json();
      const sortedCompanies = data.sort((x: any, y: any) => {
        if (x.name.toLowerCase() < y.name.toLowerCase()) return -1;
        if (x.name.toLowerCase() > y.name.toLowerCase()) return 1;
        return 0;
      });
      setCompanies([...sortedCompanies]);
      setFilteredCompanies(sortedCompanies);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  useEffect(() => {
    let filtered = companies;
    if (companyInput.length > 0) {
      filtered = filtered.filter(x => x.name.toLowerCase().includes(companyInput.toLowerCase()));
    }
    if (industriesInput.length > 0) {
      filtered = filtered.filter((x: any) => {
        const industryNames = x.industries.map((y: any) => y.name.toLowerCase()) as string[];
        const industryNameString = industryNames.join(" ") as string;
        return industryNameString.includes(industriesInput);
      });
    }
    if (locationsInput.length > 0) {
      filtered = filtered.filter((x: any) => {
        const locationNames = x.locations.map((y: any) => y.name.toLowerCase()) as string[];
        const locationNameString = locationNames.join(" ") as string;
        return locationNameString.includes(locationsInput);
      });
    }
    setFilteredCompanies(filtered);
  }, [companyInput, industriesInput, locationsInput]);

  return (
    <Wrapper>
      <h1>Companies</h1>
      {isLoading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th className="company">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={companyInput}
                    onChange={e => setCompanyInput(e.target.value)}
                  />
                </th>
                <th className="industries">
                  <label>Industries</label>
                  <input
                    type="text"
                    name="industries"
                    value={industriesInput}
                    onChange={e => setIndustriesInput(e.target.value)}
                  />
                </th>
                <th className="locations">
                  <label>Locations</label>
                  <input
                    type="text"
                    name="locations"
                    value={locationsInput}
                    onChange={e => setLocationsInput(e.target.value)}
                  />
                </th>
                <th className="actions"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 &&
                filteredCompanies.map(x => {
                  return (
                    <tr key={x._id}>
                      <td>
                        <p className="name">{x.name}</p>
                        <p className="id">
                          <strong>db: </strong>
                          {x._id}
                        </p>
                        <p className="id">
                          <strong>API: </strong>
                          {x.id}
                        </p>
                      </td>
                      <td>
                        <ul className="industry-list">
                          {x.industries.length > 0 &&
                            x.industries.map((y: IHasName) => {
                              return <li key={y.name}>{y.name}</li>;
                            })}
                        </ul>
                      </td>
                      <td>
                        <ul className="location-list">
                          {x.locations.length > 0 &&
                            x.locations.map((z: IHasName) => {
                              return <li key={z.name}>{z.name}</li>;
                            })}
                        </ul>
                      </td>
                      <td>
                        <FaTrashAlt className="trash-icon" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 2rem;
    text-align: center;
  }
  .loading-wrapper {
    min-height: 400px;
  }
  .table-wrapper {
    width: calc(100% - 2rem);
    height: calc(100vh - 300px);
    box-shadow: 0 0 5px black;
    overflow: scroll;
    margin: 0 1rem 8rem;
    font-family: "Poppins", "sans-serif";
    background-color: white;
    color: black;
    table {
      min-width: 768px;
      position: relative;
      border-collapse: collapse;
      thead,
      tr {
        border: 1px solid black;
        transform: translateY(-1px);
        z-index: 9;
        label {
          display: block;
        }
        input {
          border: 1px solid black;
        }
      }
      td {
        border: 1px solid black; /* Adds a 1px solid black border to table headers and cells */
        padding: 2px; /* Adds some padding inside cells for better spacing */
        text-align: left; /* Aligns text to the left */
        vertical-align: top;
      }
      th {
        border: 1px solid black; /* Adds a 1px solid black border to table headers and cells */
        text-align: left; /* Aligns text to the left */

        padding: 8px;
      }
      thead {
        position: sticky;
        top: 0;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
        background-color: #dadada;
        font-size: 12px;
        .company {
          width: 200px;
        }
        .industries {
          width: 200px;
        }
        .actions {
          width: 50px;
        }
      }
      .id {
        font-size: 9px;
        white-space: nowrap;
      }
      .name {
        font-weight: bold;
        font-size: 14px;
        line-height: 12px;
        margin-bottom: 2px;
      }
      .industry-list,
      .location-list {
        font-size: 12px;
        margin-left: 1rem;
      }
    }
    .trash-icon {
      color: white;
      border-radius: 3px;
      padding: 5px;
      height: 30px;
      width: 30px;
      background-color: red;
    }
  }
  @media (min-width: 768px) {
    .table-wrapper {
      width: unset;
      overflow: scroll;
      table {
        width: 60vw;
        min-width: 768px;
        max-width: 1200px;
        .location-list {
          display: grid;
          grid-template-columns: 50% 50%;
        }
      }
    }
  }
`;
