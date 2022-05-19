import React, { useEffect, useState } from "react";
import jobs from "./data";
import { Link } from "react-router-dom";
import Header from './Header';

function JobLists() {
  const [jobData, setJobData] = useState(jobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByLocation, setSearchByLocation] = useState("");
  const searchTermValue = searchTerm.toLowerCase();

  const locationSearchHandler = () => {
    const filteredData = jobs.filter((job) =>
      job.location.toLowerCase().includes(searchByLocation.toLowerCase())
    );

    setJobData(filteredData);
  };
  
  const filterJobData = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "full-time") {
      const filteredData = jobs.filter((job) => job.contract === "Full Time");
      setJobData(filteredData);
    } else if (filterValue === "part-time") {
      const filteredData = jobs.filter((job) => job.contract === "Part Time");
      setJobData(filteredData);
    } else if (filterValue === "freelance") {
      const filteredData = jobs.filter((job) => job.contract === "Freelance");
      setJobData(filteredData);
    } else if (filterValue === "contract") {
      const filteredData = jobs.filter((job) => job.contract === "Contract");
      setJobData(filteredData);
    } else {
      setJobData(jobs);
    }
  };

  useEffect(async()=>{

    await fetch("https://elitehackers.herokuapp.com/jobs", {
      method:"GET",
      headers:{
        "Content-Type": "application/json;charset=utf-8",
        "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmVlaGEiLCJlbWFpbCI6InJlZWhhQGdvb2dsZS5jb20iLCJpZCI6IjYyNmJiOWY2MzU4NmUyYjlhOTA0ZjMyNiIsImlhdCI6MTY1MTIyNzI1MywiZXhwIjoxNjUzODE5MjUzfQ.8It5-C1lC5NCfSk7pHlPAb3EyraqKjJC4HqHJpdWFkU",
        "Accept":"application/json, text/plain, /",
      }
    })
    .then(res=> res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log("Error is ", err))
  },[])

  return (
    <div>
      <Header />
      <div>
        <section className="job__list">
        <div className="contaainer">
          <div className="job__list__wrapper">
            <div className="search__panel">
              <div className="search__panel-01">
                <span>
                  <i class="ri-search-line"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search by title, companies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search__panel-02">
                <span>
                  <i class="ri-map-pin-line"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search by location"
                  value={searchByLocation}
                  onChange={(e) => setSearchByLocation(e.target.value)}
                />
                <button className="btn" onClick={locationSearchHandler}>
                  Search
                </button>
              </div>
              <div className="search__panel-03">
                <select onChange={filterJobData}>
                  <option>Filter job by</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="freelance">Freelance</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            </div>
            <div className="jobs__wrapper">
              {jobData
                ?.filter((job) => {
                  if (searchTerm === "") return job;
                  if (
                    job.position.toLowerCase().includes(searchTermValue) ||
                    job.company.toLowerCase().includes(searchTermValue)
                  )
                    return job;
                })
                .map((item) => (
                  <div className="job__item" key={item.id}>
                    <img src={item.logo} alt="" />
                    <div className="job__content">
                      <h6>
                        {item.postedAt} - {item.contract}
                      </h6>
                      <h1>
                        <Link to={`/jobs/${item.position}`}>{item.position}</Link>
                      </h1>
                      <p>{item.company}</p>
                      <div className="location">
                        <p>
                          Location: <span>{item.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    
  )
}

export default JobLists