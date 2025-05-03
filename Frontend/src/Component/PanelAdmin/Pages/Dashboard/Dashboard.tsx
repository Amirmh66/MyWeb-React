import "./Dashboard.css";
import OverallStatistics from "./Sections/OverallStatistics";
import Clock from "./Sections/Clock";

function Dashboard() {

  return (
    <div className="flex flex-col-reverse md:flex-row gap-5">
      <OverallStatistics />
      <Clock />
    </div>
  )
}

export default Dashboard;