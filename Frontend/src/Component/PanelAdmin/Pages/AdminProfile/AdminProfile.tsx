import Button from "../../../Elements/Buttons";
import "./AdminProfile.css";
import { useSelector } from "react-redux";
import { PencilSquareIcon, UserIcon } from "@heroicons/react/20/solid"
import { CameraIcon } from "@heroicons/react/24/outline"
import { selectCurrentEmail, selectCurrentRole } from '../../../Features/Authentication/AuthSlice/AuthSlice';
function AdminProfile() {
  const email = useSelector(selectCurrentEmail);
  const role = useSelector(selectCurrentRole);
  return (
    <>
      <div className='flex flex-col md:flex-row items-start gap-6'>

        <div className="bg-white dark:bg-gray-950 flex flex-col items-center py-4 gap-3 rounded-xl w-3/12 relative overflow-hidden">

          <div className="bg-slate-200/90 dark:bg-violet-800/85 p-2 rounded-full inline-block absolute ml-20 mt-24 z-50 cursor-pointer hover:scale-105 transition duration-300">
            <CameraIcon className="w-5" /></div>
          <img srcSet="/Images/DarwinLowQuality.webp" loading='lazy'
            className='w-20 md:w-6/12 border-4 rounded-full border-gray-100 dark:border-slate-800 z-40' />

          <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-white">
            <div className="card-wrapper h-[50px] w-[90px]">
              <div className="card-content flex items-center justify-center text-xs">
                <p className="font-bold text-sm select-none">{role}</p>
              </div>
            </div>
          </div>
          <div className="z-50 text-center">
            <p className='font-semibold'>{email}</p>
          </div>

          <div className="w-28 h-28 bg-red-500/50  blur-3xl opacity-60 -top-5 -left-5 absolute rounded-full"></div>
          <div className="w-28 h-28 bg-violet-500/50  blur-3xl opacity-60 -top-10 -right-10 absolute rounded-full"></div>
          <div className="w-28 h-28 bg-orange-500/50 blur-3xl opacity-60 top-56 right-10 absolute rounded-full"></div>
        </div>

        <div className="bg-white dark:bg-gray-950 p-4 rounded-xl">
          <div className="pb-6 flex items-center gap-1">
            <p className="font-bold text-sm">Profile Details</p>
            <div className="border-b flex-grow"></div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className="inpBox">
              <span className="inpText">UserName</span>
              <input type="text" name="UserName" placeholder='example: Androw129' />
              <UserIcon className="inpIcon" />
            </div>
            <div className="inpBox">
              <span className="inpText">FullName</span>
              <input type="text" name="FullName" placeholder='example: Androw Jeferson' />
              <UserIcon className="inpIcon" />
            </div>
            <div className="inpBox">
              <span className="inpText">Email</span>
              <input type="text" name="Email" placeholder='example: emaill@gmail.com' />
              <UserIcon className="inpIcon" />
            </div>
            <div className="inpBox">
              <span className="inpText">PhoneNumber</span>
              <input type="number" name="PhoneNumber" placeholder='example: 09123456789' minLength={11} maxLength={11} />
              <UserIcon className="inpIcon" />
            </div>
          </div>
          <div className=" mt-3">
            <Button
              text="Update Profile"
              className="bg-blue-600 hover:bg-blue-700"
              icon={<PencilSquareIcon className="w-5" />} />
          </div>
        </div>
      </div>
    </>
  )
}
export default AdminProfile