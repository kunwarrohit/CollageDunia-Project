import React, { useState, useEffect } from "react";
import tableData from "./lib/tableHeader";
import collages from "./lib/collegesData.js";

const CollegeRow = () => {
  return (
    <table>
      <thead>
        <tr className="">
          {tableData.tableHeaders.map((header, index) => (
            <th className="p-4 text-center border-b border-blue-gray-100 bg-blue-400  ">
              <th key={index}>{header}</th>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {collages.map((college, index) => (
          <tr key={index}>
            <tr>
              <div className="college-row">
                <div className="cd-rank">
                  <span>#{college.rank}</span>
                </div>
                <div className="college-details">
                  <img
                    src={college.logo}
                    alt={college.name}
                    className="college-logo"
                  />
                  <div className="college-info">
                    <p className="name">{college.name}</p>
                    <p className="loc">
                      {college.location} | {college.approval}
                    </p>
                    <div className="course">
                      <p>{college.course.name}</p>
                      <span>
                        {college.course.exam} {college.course.cutoff}
                      </span>
                    </div>
                    <div className="actions">
                      <button className="apply-now">Apply Now</button>
                      <button className="download-brochure">
                        Download Brochure
                      </button>
                    </div>
                  </div>
                </div>
                <div className="fees">
                  <span className="fee">
                    &#8377; {college.fees.toLocaleString()}
                  </span>
                  <p className="course">BE/B.Tech</p>
                  <p className="course">1st Year Fees</p>
                  <p className="compare">Compare Fees</p>
                </div>
                <div className="placement">
                  <p>
                    <div className="fee">
                      &#8377; {college.placement.average.toLocaleString()}
                    </div>
                    <div> Avgerage Package</div>
                  </p>
                  <p>
                    <div className="fee">
                      &#8377; {college.placement.highest.toLocaleString()}
                    </div>
                    <div> Highest Package</div>
                  </p>
                  <p className="compare">Compare Placement</p>
                </div>
                <div className="user-reviews">
                  <span>{college.userReviews.rating} / 5</span>
                  <p>
                    Based on {college.userReviews.totalReviews} User Reviews
                  </p>
                  <span className="compare">{college.userReviews.badge}</span>
                </div>
                <div className="ranking">
                  <p>
                    #{college.nationalRank}/{college.totalColleges} in India
                  </p>
                  <p>{college.rankingAgencies.join(", ")}</p>
                </div>
              </div>
            </tr>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollegeRow;
