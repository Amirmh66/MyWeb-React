import { useEffect, useState, useTransition } from "react";
import "./Dashboard.css";
import Counter from "./Counter";
import { ClockIcon, ShoppingBagIcon, UsersIcon, UserGroupIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import apiRoutes from "../../../../Constants/apiRoutes";

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [userCount, setUserCount] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getUsersCount();
    GetProductCount();
  }, []);

  //#region GetUsersCount
  const getUsersCount = async () => {
    try {
      await axios.get(apiRoutes.getUserCount).then((res) => {
        startTransition(() => {
          setUserCount(res.data);
        })
      })
    } catch (error: any) {
      if (error.data) {
        setError("Server Can't Response!");
      }
      setError(error.response.data.message);
    }
  }
  //#endregion
  //#region GetProductCount
  const GetProductCount = async () => {
    try {
      await axios.get(apiRoutes.getProductCount).then((res) => {
        startTransition(() => {
          setProductCount(res.data);
        })
      });
    } catch (error: any) {
      if (error.data) {
        setError("Server Can't Response!");
      }
      setError(error.response.data.message);
    }
  }
  //#endregion


  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-5">

        <div className="p-4 text-center bg-white rounded-lg flex justify-center shadow-md dark:bg-gray-900">
          <div className="grid grid-cols-2 gap-10 md:gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="w-32 h-32 p-2 bg-orange-100 rounded-lg dark:bg-orange-400">
              <UserGroupIcon className="w-8 p-1 text-white bg-orange-400 rounded-full" />
              <p className="text-xl font-extrabold text-sky-800" title="">{userCount}</p>
              <p className="text-lg font-bold text-sky-950" title="All Users Registered In MyWeb">Users</p>
            </div>
            <div className="w-32 h-32 p-2 bg-yellow-100 rounded-lg dark:bg-yellow-400">
              <ShoppingBagIcon className="w-8 p-1 text-white bg-yellow-400 rounded-full" />
              <p className="text-xl font-extrabold text-sky-800" title="">{productCount}</p>
              <p className="text-lg font-bold text-sky-950" title="All Users Registered In MyWeb">Products</p>
            </div>
            <div className="w-32 h-32 p-2 bg-green-100 rounded-lg dark:bg-green-400">
              <ShoppingCartIcon className="w-8 p-1 text-white bg-green-400 rounded-full" />
              <p className="text-xl font-extrabold text-sky-800" title="">0</p>
              <p className="text-lg font-bold text-sky-950" title="All Users Registered In MyWeb">Orders</p>
            </div>
            <div className="w-32 h-32 p-2 rounded-lg bg-violet-100 dark:bg-violet-400">
              <UsersIcon className="p-2 text-white rounded-full w-9 bg-violet-400" />
              <p className="text-xl font-extrabold text-sky-800" title="">0</p>
              <p className="text-lg font-bold text-sky-950" title="All Users Registered In MyWeb">Customers</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-1 p-4 bg-white rounded-lg dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex gap-5 my-auto">
              <ClockIcon className="w-7" />
              <span className="font-semibold">{time.toLocaleTimeString()}</span>
              <div className="border"></div>
              <span className="font-semibold">{time.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-4 mt-10 text-center bg-white rounded-lg dark:bg-gray-900 text">
        <Counter />
      </div> */}
    </>
  );
}
