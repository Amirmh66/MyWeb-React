import Button from "../../../../Elements/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Notification from "../../../../Elements/Notification";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import apiRoutes from "../../../../../Constants/apiRoutes";
import BrandValidation from "../../../../../Validations/BrandValidation";
import '../Brand.css'

interface ITypes {
    _id: string;
    typeName: string;
}
interface IBrand {
    name: string;
    logoUrl: string;
    description: string;
    createdAt: string;
    types: string[];
}

function AddBrand() {
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [isSendRequest, setIsSendRequest] = useState(true);
    const [types, setTypes] = useState<ITypes[]>([]);

    //#region OnSubmit
    const onSave = async (values: IBrand) => {
        try {
            setIsSubmitting(true)
            await axios.post(apiRoutes.createBrand, values);
            setShowConfirm(true)
            navigate("/PanelAdmin/Brands");
        } catch (error: any) {
            setError(error.response.data.messages);
        } finally {
            setIsSubmitting(false);
        }
    };
    //#endregion
    //#region GetTypes
    useEffect(() => {
        if (isSendRequest) {
            getTypes();
        }
    }, [isSendRequest]);
    const getTypes = async () => {
        try {
            await axios.get(apiRoutes.getTypes).then((res) => {
                const types = res.data;
                setTypes(types);
            })
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setIsSendRequest(false);
        }
    }
    //#endregion

    const initialValues = {
        name: "",
        logoUrl: "",
        description: "",
        createdAt: "",
        types: [],
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSave}
                validationSchema={BrandValidation}
            >
                <Form>
                    <div className="px-10">
                        <div className="structure-brand">
                            <h1 className="font-bold text-3xl"><span className="underline underline-offset-4">New</span> Brand</h1>
                            <div className="structInp-brand">
                                {error && (
                                    <div className="flex items-center gap-1 error">
                                        <span className='w-5 '>
                                            <ExclamationTriangleIcon />
                                        </span>
                                        <p>
                                            {error}
                                        </p>
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    <div>
                                        <label htmlFor="BrandName">BrandName:</label>
                                        <Field
                                            id="BrandName"
                                            name="name"
                                            type="text"
                                            className="input"
                                            placeholder="Sony etc...(required)"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="CreatedAt">CreatedAt:</label>
                                        <Field
                                            id="CreatedAt"
                                            name="createdAt"
                                            type="date"
                                            className="input"
                                            placeholder="CreatedAt(required)"
                                        />
                                        <ErrorMessage
                                            name="createdAt"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Types</label>
                                    <div className="overflow-auto" style={{ maxHeight: "250px" }}>
                                        {types.map((t) => (
                                            <div key={t._id} className="flex gap-2 border p-2 rounded-lg my-1" >
                                                <Field type="checkbox" name="types" value={t._id} />
                                                <label htmlFor={t._id}>{t.typeName}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <ErrorMessage
                                        name="types"
                                        className="text-red-500"
                                        component="p" />
                                </div>
                                <div>
                                    <label htmlFor="textarea">Description:</label>
                                    <Field
                                        name="description"
                                        type="textarea"
                                        id="textarea"
                                        as="textarea"
                                        placeholder="Description(optional)"
                                    />
                                </div>
                                {/* upload Logo here */}
                                <div>
                                    <label className="mb-2">UploadLogo</label>
                                    <div className="extraOutline p-4 bg-gray-100 dark:bg-gray-800 w-max bg-whtie m-auto rounded-lg">
                                        <div
                                            className="file_upload p-5 relative border-4 border-dotted border-gray-300 dark:border-gray-950 rounded-lg"
                                            style={{ width: "380px" }}
                                        >
                                            <div className="input_field flex flex-col w-max mx-auto text-center">
                                                <label>
                                                    <input
                                                        className="text-sm cursor-pointer w-36 hidden"
                                                        type="file"
                                                        multiple
                                                    />
                                                    <div
                                                        className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold
                             cursor-pointer p-1 px-3 hover:bg-indigo-500"
                                                    >
                                                        Select
                                                    </div>
                                                </label>

                                                <div className="title text-indigo-500 uppercase">
                                                    or drop files here
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-4">
                                <Button
                                    text={isSubmitting ? ("Loading...") : ("Create")}
                                    disable={isSubmitting}
                                    className="bg-green-700 px-7"
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
            <Notification title={"Add brand successfully"} show={showConfirm} />
        </>
    );
}
export default AddBrand;
