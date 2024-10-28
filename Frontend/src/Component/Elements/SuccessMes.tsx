import Button from "./Buttons";
import { ISuccessMes } from "../../Types/Interfaces";
import { Confirm } from "./Icons";

function SusscessMes({ onCancle, message, HomeMes }: ISuccessMes) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

        <div className="bg-green-400 dark:bg-green-700 rounded-lg p-5 shadow-lg">

          <div className="flex justify-between items-center gap-4">

            <div className="p-2 inline-block text-green-600 bg-gray-200 rounded-full">
                <Confirm/>
            </div>

            <p className="text-black dark:text-gray-200">{message}</p>
            <p>{HomeMes}</p>
          </div>

          <div className="flex pt-5 justify-center">
            <Button
              onClick={onCancle}
              text="Confirm"
              className="bg-green-500 dark:bg-green-950"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SusscessMes;
