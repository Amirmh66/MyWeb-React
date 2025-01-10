import Button from "./Buttons";
import { ISuccessMes } from "../../Types/Interfaces";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/20/solid";

function SusscessMes({ onCancle, message }: ISuccessMes) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col py-3">

          <div className="flex justify-end pr-3">
            <XMarkIcon className="text-gray-400 cursor-pointer w-5" onClick={onCancle}/>
          </div>

          <div className="flex flex-col items-center">
            <CheckBadgeIcon className="w-12 text-green-600" />
            <div className="w-3/4">
              <p className="text-black dark:text-gray-300 font-semibold break-before-auto text-center">{message}</p>
            </div>
          </div>

          <div className="flex justify-center items-center mt-3">
            <Button
              onClick={onCancle}
              text="Close"
              className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default SusscessMes;