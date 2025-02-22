import { Link, Outlet, useLocation } from "react-router-dom"
import Button from "../../../Elements/Buttons"
import { useEffect, useState } from "react"
import axios from "axios";
import apiRoutes from "../../../../Constants/apiRoutes";
import { ArrowPathIcon, DevicePhoneMobileIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
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

  //#region ShowModal
  // const handleShowModal = async (id: string) => {
  //   setIsShowModal(true);
  //   try {
  //     await axios.get(apiRoutes.getBrandTypes(id)).then((res) => {
  //       setTypes(res.data);
  //     })
  //   } catch (error: any) {
  //     setError(error.response.data.message);
  //   }
  // }
  //#endregion
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
          <div className="boxTable">
            <div className="overflow-auto" style={{ maxHeight: "500px" }}>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col">Logo</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {brands.map((b) => (
                    <tr
                      key={b._id}
                      className="hover:bg-gray-300 dark:hover:bg-gray-900"
                    >
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
                        {/* <Button
                          icon={<DevicePhoneMobileIcon className="w-5" />}
                          text="ShowTypes"
                          onClick={() => handleShowModal(b._id)}
                          className="bg-yellow-500"
                        /> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}

      {/* {isShowModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="rounded-lg w-72 flex flex-col justify-start gap-5 bg-white">
            <div className="py-1 px-2 flex justify-between gap-10 ">
              <p className="text-lg font-semibold">Types:</p>
              <ul className="overflow-y-auto w-full h-64">
                {types.map((t) => (
                  <li className="border hover:bg-gray-50 rounded-lg p-2 m-1">
                    <p className="font-semibold">{t.typeName}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2 text-center">
              <Button text="Close" className="bg-gray-400 w-full text-center" onClick={() => setIsShowModal(false)} />
            </div>
          </div>
        </div>
      )} */}

      <Modal title="Are You Sure You Want To Delete This Brand?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
    </>
  )
}
export default Brands