import { TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { IAlert } from "../../Types/Interfaces";
import Button from "./Buttons";

function Alert({ message, onConfirm, onCancle }: IAlert) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

        <div className="bg-white dark:bg-gray-900 rounded-2xl py-3 shadow-lg flex flex-col justify-center">
          <div className="flex justify-end pr-3">
            <XMarkIcon className="w-6 text-gray-500 cursor-pointer" onClick={onCancle} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <TrashIcon className="w-14 text-red-600 pb-2" />
            <p className="text-xl font-bold">Confirm Delete</p>
            <div className="w-3/4 text-center">
              <p className="text-black dark:text-gray-300 break-before-auto font-semibold">{message}</p>
            </div>
          </div>


          <div className="flex pt-4 justify-center">
            <Button
              onClick={onConfirm}
              text="Delete"
              className="bg-red-600 "
            />
            <Button
              onClick={onCancle}
              text="Cancel"
              className="bg-white dark:bg-gray-200 text-gray-500"
            />
          </div>

        </div>

      </div>
    </>
  );
}

export default Alert;
