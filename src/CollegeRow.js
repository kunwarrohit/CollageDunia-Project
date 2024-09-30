import React, { useState } from "react";
import tableData from "./lib/tableHeader";
import colleges from "./lib/collegesData.js";
import sortingData from "./lib/sortData";

const CollegeRow = () => {
  const [sortedColleges, setSortedColleges] = useState(colleges);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedData = [...sortedColleges].sort((a, b) => {
      if (column === "fees") {
        return newSortOrder === "asc" ? a.fees - b.fees : b.fees - a.fees;
      } else if (column === "userReviews") {
        return newSortOrder === "asc"
          ? a.userReviews.rating - b.userReviews.rating
          : b.userReviews.rating - a.userReviews.rating;
      } else if (column === "ranking") {
        return newSortOrder === "asc"
          ? a.nationalRank - b.nationalRank
          : b.nationalRank - a.nationalRank;
      }
      return 0;
    });
    setSortedColleges(sortedData);
    setSortColumn(column);
  };
  return (
    <div>
      <div className="sort-buttons">
        {sortingData.sortData.map((header, index) => (
          <button
            key={index}
            className={`sort-button ${
              sortColumn === header.toLowerCase() ? "active" : ""
            }`}
            onClick={() => handleSort(header.toLowerCase())}
          >
            {header}
            {sortColumn === header.toLowerCase() && (
              <span className={`sort-icon ${sortOrder}`}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </span>
            )}
          </button>
        ))}
      </div>
      <table className="college-table">
        <thead>
          <tr>
            {tableData.tableHeaders.map((header, index) => (
              <th
                key={index}
                className={`p-4 text-center border-b border-x-4 bg-cyan-200 ${
                  sortColumn === header.toLowerCase() ? "sorted" : ""
                }`}
                onClick={() => handleSort(header.toLowerCase())}
              >
                {header}
                {sortColumn === header.toLowerCase() && (
                  <span className={`sort-icon ${sortOrder}`}>
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colleges.map((college, index) => (
            <tr key={index}>
              {/* Map the college data to corresponding table cells */}
              <td className="bod">#{college.rank}</td>

              <td className="college-row bod">
                <img
                  src={college.logo}
                  alt={college.name}
                  className="college-logo"
                />
                <div className="college-info">
                  <p className="name">{college.name}</p>
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
              </td>

              <td className="bod">
                <div className="fees">
                  <span className="fee">
                    &#8377; {college.fees.toLocaleString()}
                  </span>
                  <p className="course">BE/B.Tech</p>
                  <p className="course">1st Year Fees</p>
                  <p className="compare">Compare Fees</p>
                </div>
              </td>
              <td className="bod">
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
              </td>
              <td className="bod">
                <div className="user-reviews">
                  <span>{college.userReviews.rating} / 5</span>
                  <p>
                    Based on {college.userReviews.totalReviews} User Reviews
                  </p>
                  <span className="compare">{college.userReviews.badge}</span>
                </div>
              </td>

              <td className="bod">
                <div className="ranking">
                  <p>
                    #{college.nationalRank}/{college.totalColleges} in India
                  </p>
                  <p>{college.rankingAgencies.join(", ")}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeRow;
