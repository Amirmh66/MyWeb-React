import axios from "axios";
import Button from "../../../Elements/Buttons";
import "./AdminProfile.css";
import { useSelector } from "react-redux";
import { PencilSquareIcon, UserIcon } from "@heroicons/react/20/solid"
import { Form, Field, Formik } from "formik";
import apiRoutes from "../../../../Constants/apiRoutes";
import { selectCurrentUserName, selectCurrentRole } from '../../../Features/Authentication/AuthSlice/AuthSlice';

function AdminProfile() {
  const userName = useSelector(selectCurrentUserName);
  const role = useSelector(selectCurrentRole);

  const SubmitForm = async () => {
    try {
      await axios.post(apiRoutes.updateUser()).then(res => {

      })
    } catch (error) {

    }
  }

  const initialValues = {
    userName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  }

  return (
    <>
      <div className='flex flex-col md:flex-row items-start gap-6'>
        <div className="bg-white dark:bg-gray-950 flex flex-col items-center py-3 gap-3 rounded-xl">
          <img srcSet="/Images/DarwinLowQuality.webp" loading='lazy' className='w-20 md:w-6/12 select-none border-4 rounded-full 
          border-gray-200 dark:border-slate-700' />
          <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-white">
            <div className="card-wrapper h-[50px] w-[90px]">
              <div className="card-content flex items-center justify-center text-xs">
                <p className="font-bold text-sm select-none">{role}</p>
              </div>
            </div>
          </div>
          <p className='font-semibold text-xl'>{userName}</p>
          <p className='text-sm text-gray-500'>email@gmail.com</p>
        </div>

        <div className="bg-white dark:bg-gray-950 p-4 rounded-xl">

          <div className="pb-6 flex items-center gap-1">
            <p className="font-bold text-sm">Profile Details</p>
            <div className="border-b flex-grow"></div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={SubmitForm} >
            <Form>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className="inpBox">
                  <span className="inpText">UserName</span>
                  <Field type="text" name="UserName" placeholder='example: Androw129' />
                  <UserIcon className="inpIcon" />
                </div>
                <div className="inpBox">
                  <span className="inpText">FullName</span>
                  <Field type="text" name="FullName" placeholder='example: Androw Jeferson' />
                  <UserIcon className="inpIcon" />
                </div>
                <div className="inpBox">
                  <span className="inpText">Email</span>
                  <Field type="text" name="Email" placeholder='example: emaill@gmail.com' />
                  <UserIcon className="inpIcon" />
                </div>
                <div className="inpBox">
                  <span className="inpText">PhoneNumber</span>
                  <Field type="number" name="PhoneNumber" placeholder='example: 09123456789' minLength={11} maxLength={11} />
                  <UserIcon className="inpIcon" />
                </div>
              </div>
            </Form>
          </Formik>

          <div className=" mt-3">
            <Button
              text="Update Profile"
              className="bg-blue-600"
              icon={<PencilSquareIcon className="w-5" />} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProfile
