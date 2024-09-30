import React, { useState, useEffect } from "react";
import tableData from "./lib/tableHeader.json";
import colleges from "./lib/collegesData.js";
import sortingData from "./lib/sortData.json";

const CollegeRow = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedColleges, setSortedColleges] = useState(colleges);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {
        // Load more data if scrolled near the bottom
        setCurrentPage(currentPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const handleSort = (column) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedData = [...sortedColleges].sort((a, b) => {
      if (column === "coursefees") {
        return newSortOrder === "asc" ? a.fees - b.fees : b.fees - a.fees;
      } else if (column === "userReviews") {
        return newSortOrder === "asc"
          ? a.userReviews.rating - b.userReviews.rating
          : b.userReviews.rating - a.userReviews.rating;
      } else if (column === "ranking") {
        return newSortOrder === "asc"
          ? a.nationalRank - b.nationalRank
          : b.nationalRank - a.nationalRank;
      } else if (column === "cdrank") {
        return newSortOrder === "asc" ? a.rank - b.rank : b.rank - a.rank;
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
            className={`btn sort-button ${
              sortColumn === header.toLowerCase() ? "active" : ""
            }`}
            onClick={() => handleSort(header.toLowerCase().replace(" ", ""))}
          >
            {header}
            {sortColumn === header.toLowerCase().replace(" ", "") && (
              <span className={`sort-icon ${sortOrder} `}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </span>
            )}
          </button>
        ))}
      </div>
      <table className="w-full college-table">
        <thead>
          <tr>
            {tableData.tableHeaders.map((header, index) => (
              <th
                key={index}
                className="p-4 text-center border-b border-x-4 bg-cyan-200 "
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedColleges.map((college, index) => (
            <tr className="border-b border-black-900" key={index}>
              <td className="text-center">#{college.rank}</td>

              <td className="college-row">
                <img src={college.logo} alt="" className="college-logo" />
                <div className="college-info">
                  <p className="name">{college.name}</p>
                  <p className="loc">
                    {college.location} | {college.approval}
                  </p>
                  <div className="course text-orange-500">
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

              <td>
                <div className="fees">
                  <span className="fee">
                    &#8377; {college.fees.toLocaleString()}
                  </span>
                  <p className="course">BE/B.Tech</p>
                  <p className="course">1st Year Fees</p>
                  <p className="compare cursor-pointer">Compare Fees</p>
                </div>
              </td>
              <td>
                <div className="placement">
                  <p>
                    <div className="fee">
                      &#8377; {college.placement.average.toLocaleString()}
                    </div>
                    <div className="course"> Avgerage Package</div>
                  </p>
                  <p>
                    <div className="fee">
                      &#8377; {college.placement.highest.toLocaleString()}
                    </div>
                    <div className="course"> Highest Package</div>
                  </p>
                  <p className="compare cursor-pointer">Compare Placement</p>
                </div>
              </td>
              <td>
                <div className="user-reviews">
                  <span>{college.userReviews.rating} / 5</span>
                  <p className="course">
                    Based on {college.userReviews.totalReviews} User Reviews
                  </p>
                  <span className="compare cursor-pointer">
                    {college.userReviews.badge}
                  </span>
                </div>
              </td>

              <td>
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
