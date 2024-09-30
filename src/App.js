import React from "react";
import CollegeRow from "./CollegeRow";
import colleges from "./lib/collegesData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="text-center text-2xl font-bold underline">
          College Ranking
        </p>
      </header>
      <CollegeRow />
    </div>
  );
}

export default App;
