import React from "react";
import CollegeRow from "./CollegeRow";
import colleges from "./lib/collegesData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>College Ranking</h1>
      </header>
      <div className="college-table">
        {colleges.map((college, index) => (
          <CollegeRow key={index} college={college} />
        ))}
      </div>
    </div>
  );
}

export default App;
