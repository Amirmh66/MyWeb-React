import { Link, Outlet, useLocation } from "react-router-dom"
import Button from "../../../Elements/Buttons"
import { useEffect, useState } from "react"
import axios from "axios";
import apiRoutes from "../../../../Constants/apiRoutes";
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import TablesSkeleton from "../../../Elements/TablesSkeleton";
import Modal from "../../../Elements/Modal";
interface IType {
  _id: string;
  typeName: string;
}
interface IBrand {
  _id: string;
  name: string;
  logoUrl: string;
  types: string[];
  createdAt: Date;
}
function Brands() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [isSendRequest, setIsSendRequest] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [types, setTypes] = useState<IType[]>([])
  //#region GetBrands
  useEffect(() => {
    if (isSendRequest) {
      getBrands();
    }
  }, [isSendRequest]);

  const getBrands = async () => {
    try {
      await axios.get(apiRoutes.getBrands).then((res) => {
        setBrands(res.data)
        setError(null);
      })
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setIsSendRequest(false);
    }
  }
  //#endregion
  //#region HandleDelete
  const handleDelete = (brandId: string) => {
    setShowModal(true);
    setSelectedId(brandId);
  };
  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(apiRoutes.deleteBrand(selectedId));
        setShowModal(false);
        setSelectedId(null);
        getBrands();
      } catch (error: any) {
        setError(error.response.data.message)
      }
    }
  };
  //#endregion 
  if (error) return error
  if (isSendRequest) return <TablesSkeleton />
  return (
    <>
      {location.pathname === "/PanelAdmin/Brands" ? (
        <>
          <div className="table-nav">
            <Link to="AddBrand">
              <Button text="Create Brand" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
            </Link>
            <Button
              text="Refresh Brand Table"
              icon={<ArrowPathIcon className="w-5" />}
              className="bg-blue-500"
              onClick={getBrands}
            />
          </div>
          <div className="overflow-auto" style={{ maxHeight: "500px" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Logo</th>
                  <th scope="col">Brand Name</th>
                  <th scope="col">Command</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <img className="w-10 ml-10" srcSet="/Images/Darwin.png" />
                    </td>
                    <td>{b.name}</td>
                    <td className="btn-Sec-InForm">
                      <Button
                        onClick={() => handleDelete(b._id)}
                        text="Delete"
                        icon={<TrashIcon className="w-5" />}
                        className="bg-red-600"
                      />
                      <Link to={`Editbrand/${b._id}`}>
                        <Button text="Edit" icon={<PencilSquareIcon className="w-5" />} className="bg-blue-600" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Outlet />
      )}
      <Modal title="Are You Sure You Want To Delete This Brand?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
    </>
  )
}
export default Brands