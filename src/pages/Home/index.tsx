import React from "react";
import Statistics from "./components/statistics";
import NewTrend from "./components/newTrend";
import "./index.scss";

function Home() {
  return (
    <div className="cms-home">
      <Statistics />
      <NewTrend />
    </div>
  );
}

export default Home;
