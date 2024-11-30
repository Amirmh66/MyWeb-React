import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useSubmit } from 'react-router-dom';
import apiRoutes from '../../../../../Constants/apiRoutes';
import SuccessMes from '../../../../Elements/SuccessMes';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from '../../../../Elements/Buttons';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { validType } from '../../../../../Validations/TypeValidation';

interface IType {
  typeName: string;
  description: string;
}

function AddType() {
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  //#region HandleSubmit
  const onSave = async (values: IType) => {
    try {
      await axios.post(apiRoutes.createType, values).then((res) => {
        if (res.status === 200) {
          setShowConfirm(true);
          navigate("/PanelAdmin/Types")
        }
      })
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }
  //#endregion 

  function handleCancle() {
    setShowConfirm(false)
  }

  const initialValues = {
    typeName: "",
    description: "",
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSave}
        validationSchema={validType}
      >
        <Form>
          <div className="px-10">
            <div className="structure-category">
              <h1 className="font-bold text-3xl"><span className="underline underline-offset-4">New</span> Type</h1>
              <div className="structInp-category">
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
                <div>
                  <label htmlFor="TypeName">TypeName:</label>
                  <Field
                    id="TypeName"
                    name="typeName"
                    type="text"
                    className="input"
                    required
                    placeholder="TypeName(required)"
                  />
                  <ErrorMessage
                    name="typeName"
                    className="text-red-500"
                    component="p"
                  />
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
              </div>
              <div className="my-4">
                <Button
                  onClick={useSubmit}
                  text="Create"
                  className="bg-green-700"
                />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      {showConfirm && (
        <SuccessMes
          onCancle={handleCancle}
          message={"Create Category Successfully!"}
        />
      )}
    </>
  )
}
export default AddType