import { ISuccessMes } from "../../Types/Interfaces";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/20/solid";

function SusscessMes({ onClose, message }: ISuccessMes) {

  return (
    <>
      <div className={`p-2 w-3/12 rounded-lg border border-gray-200 dark:border-gray-800 bg-white drop-shadow-xl
       dark:bg-gray-950 fixed top-16 z-50 right-3 transition-opacity duration-1000 ${onClose ? ("opacity-100") : ("opacity-0")}`}>
        <div className="flex justify-between">
          <CheckBadgeIcon className="w-5 text-green-600 pb-6" />
          <div className="flex flex-col  text-start gap-1">
            <p className="font-semibold">{message}</p>
            <p className="font-medium text-sm text-slate-400">Now everyone can see the product</p>
          </div>
          <XMarkIcon onClick={onClose} className="w-4 text-gray-400 cursor-pointer hover:text-red-600
          transition-all pb-6 inline-block" />
        </div>

      </div>
    </>
  );
}

export default SusscessMes;