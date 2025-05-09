import { ICardProduct } from "../../../../../Types/Interfaces";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/20/solid";

function Card({ _id, name, price }: ICardProduct) {
  return (
    <>
      <div className="card" key={_id}>
        <div className="relative">
          <div className="m-1 absolute">
            <HeartIcon className="w-6 text-gray-100 hover:text-red-200" />
          </div>
          <Link to={`ProductDetail/${_id}`}>
            <img className="w-full bg-white h-40 rounded-lg" />
          </Link>
        </div>
        <Link to={`ProductDetail/${_id}`}>
          <div className="flex items-center justify-between my-3">
            <p className="text-sm lg:text-lg font-semibold">{name}</p>
            <p
              className="bg-gray-200 dark:bg-gray-950 rounded-full px-2 py-1
             text-black dark:text-white font-medium"
            >
              ${price}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Card;
