import BarChart from "./Charts/BarChart";

function Leaderboard() {
  return (
    <>
      <div className="w-full gap-2 sm:flex-col md:flex">
        <div className="theme w-52 rounded-lg">
          <BarChart />
        </div>
        {/* <div className="w-32 md:w-full bg-white dark:bg-gray-700 rounded-lg">
          <BarChart />
        </div> */}
      </div>
    </>
  );
}

export default Leaderboard;
