import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { IAlert } from "../../Types/Interfaces";
import Button from "./Buttons";

function Alert({ message, onConfirm, onCancle }: IAlert) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-1 inline-block text-red-700 bg-red-300 rounded-full">
              <ExclamationCircleIcon className="w-7"/>
            </div>

            <p className="text-black dark:text-gray-200">{message}</p>
          </div>

          <div className="flex pt-5 justify-end">
            <Button
              onClick={onCancle}
              text="Cancel"
              className="bg-gray-400 dark:bg-gray-500"
            />
            <Button
              onClick={onConfirm}
              text="Confirm"
              className="bg-green-400 dark:bg-green-700"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;
