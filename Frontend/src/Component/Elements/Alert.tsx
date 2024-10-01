import { IAlert } from "../../Types/Interfaces";
import { Button } from "./Buttons";
import { Warning } from "./Icons";

function Alert({ message, onConfirm, onCancle }: IAlert) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

        <div className="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-lg">

          <div className="flex justify-between items-center gap-4">

            <div className="p-2 inline-block text-red-600 bg-gray-200 rounded-full">
            <Warning/>
            </div>

            <p className="text-black dark:text-gray-200">{message}</p>
          </div>

          <div className="flex gap-10 pt-5 justify-around">
            <Button onClick={onConfirm} text="Confirm" color="bg-green-400 dark:bg-green-700" />
            <Button onClick={onCancle} text="Cancel" color="bg-gray-400 dark:bg-gray-500" />
          </div>

        </div>

      </div>
    </>
  );
}

export default Alert;
