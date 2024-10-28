import { ICardProduct } from "../../../../../Types/Interfaces";
import { Link } from "react-router-dom";

function Card({ _id, name, summary, price }: ICardProduct) {
  return (
    <>
      <Link to={`ProductDetail/${_id}`}>
        <div className="card" key={_id}>
          <div className="w-full h-42">
            <img
              srcSet="/Images/usaflag.jpeg"
              alt={name}
              className="w-full rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between ">
            <div>
              <p className="text-lg font-semibold text-left pt-3">{name}</p>
              <p className="text-sm font-medium line-clamp-1">{summary}</p>
            </div>
            <p className="bg-gray-200 rounded-full px-2 py-1 text-black font-medium">
              ${price}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
