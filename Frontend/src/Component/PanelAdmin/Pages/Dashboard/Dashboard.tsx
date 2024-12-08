import { useEffect, useState } from "react";
import "./Dashboard.css";
import Counter from "./Counter";
import { ClockIcon } from "@heroicons/react/20/solid";

export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 p-4 text rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold ">My WebSite</p>
          </div>
          <div className="flex gap-5 my-auto">
            <ClockIcon className="w-7" />
            <span className="font-semibold">{time.toLocaleTimeString()}</span>
            <div className="border"></div>
            <span className="font-semibold">{time.toLocaleDateString()}</span>
          </div>
          <button className="exportBtn">
            <p>Export</p>
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-4 mt-10 text rounded-lg text-center">
        <Counter />
      </div>
    </>
  );
}
