import { useAuth } from "../../../Provider/AuthProvider";
import "./Dashboard.css";
export default function Dashboard() {
  const auth = useAuth();
  return (
    <>
      <div>
        <div className="bg-white dark:bg-gray-900 p-4 text rounded-lg">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Today's Selles</p>
              <p>All Sells</p>
            </div>

            <button className="exportBtn">
              <p>Export</p>
            </button>
          </div>
          <div className="my-3">
            <h1>UserId:{auth?.user}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
