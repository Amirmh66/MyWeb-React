import { Button } from "../../Elements/Buttons";
import "./Product.css";
import { ChebronDown, Search } from "../../Elements/Icons";
import type { IProduct } from "../../../Types/Interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //#region GetAllProduct
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:3000/Products");
        if (!response.ok) {
          throw new Error("Network Response was not Ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch ({ error }: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    //#endregion
    fetchProduct();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-md p-2 drop-shadow">
        <div className="head-table color-txt">
          <thead>
            <tr>
              <th>
                <p>Search for Product</p>
              </th>
              {/* All Category */}
              <th>
                <button className="flex items-center th-h">
                  All Category
                  <ChebronDown />
                </button>
              </th>
              {/* All Product */}
              <th>
                <button className="flex items-center th-h">
                  All Product
                  <ChebronDown />
                </button>
              </th>
              {/* Srearch */}
              <th>
                <button className="flex items-center th-h">
                  <Search />
                </button>
              </th>
              {/* Button-Add */}
              <th>
                <Link to={"/AddProduct"}>
                  <Button text="New Product" color="bg-green-500" />
                </Link>
              </th>
            </tr>
          </thead>
        </div>

        <table className="table color-txt p-5">
          <thead>
            <tr>
              <th className="th">
                <input type="checkbox" />
              </th>

              <th className="th">
                <p>Image</p>
              </th>

              <th className="th">
                <p>Name</p>
              </th>

              <th className="th">
                <p>Status</p>
              </th>

              <th className="th">
                <p>Stock</p>
              </th>
              <th className="th">
                <p>Price</p>
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr className="tr">
                <td className="td">
                  <input type="checkbox" />
                </td>

                <td className="td">
                  <img className="w-12 h-12 rounded" src={p.Picture} />
                </td>

                <td className="td">
                  <p>{p.Name}</p>
                </td>

                <td className="td">
                  <p>{p.Status}</p>
                </td>

                <td className="td">
                  <p>{p.Stock}</p>
                </td>

                <td className="td">
                  <p>${p.Price}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
