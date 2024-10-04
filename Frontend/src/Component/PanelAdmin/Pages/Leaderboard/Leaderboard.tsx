import React from "react";
import BarChart from "./Charts/BarChart";

function Leaderboard() {
  return (
    <>
      <div className="w-full gap-2 flex">
        <div className="w-full bg-white dark:bg-gray-700 rounded-lg">
          <BarChart />
        </div>
        <div className="w-full bg-white dark:bg-gray-700 rounded-lg">
          <BarChart />
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
