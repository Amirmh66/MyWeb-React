import axios from "axios"
import Button from "../../../../Elements/Buttons"
import PageName from "../../../../Elements/PageName"
import apiRoutes from "../../../../../Constants/apiRoutes"
import { useEffect, useState } from "react"
import { ExclamationTriangleIcon, PencilSquareIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid"
import Modal from "../../../../Elements/Modal"
import Notification from "../../../../Elements/Notification"

interface IType {
  key: string;
  value: string;
  description: string;
  group: string;
}

function StoreSetting() {
  const [settings, setSettins] = useState<IType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [applyDefSet, setApplyDefSet] = useState(false);

  //#region DefaultSetting
  const defaultSetting = async () => {
    try {
      await axios.get(apiRoutes.defaultSetting("Store")).then((res) => {
        setShowModal(false);
        setApplyDefSet(true)
      })
    } catch (error) {
      console.log(error)
    }
  }
  //#endregion
  //#region GetSettingsByGroup
  useEffect(() => {
    GetSettingsByGroup("Store");
  }, []);

  const GetSettingsByGroup = async (group: string) => {
    try {
      await axios.get(apiRoutes.getSettings(group)).then((res) => {
        setSettins(res.data)
      });
    } catch (error) {
      console.log(error);

    }
  }
  //#endregion

  return (
    <>
      <PageName pageName="StoreSetting" />
      <div className="inline-block">
        {settings.map((i) => (
          <div className="bg-white dark:bg-slate-950 my-10 p-5 rounded-xl flex justify-between gap-10 items-center">
            <p><span className="uppercase">{i.key}</span>{" : "}{i.value}</p>
            <Button className="bg-yellow-500" icon={<PencilSquareIcon className="w-4" />} text="Edit" />
          </div>
        ))}
      </div>
      <div>
        <Button text="DefaultSetting" icon={<WrenchScrewdriverIcon className="w-4" />} onClick={() => setShowModal(true)} className="bg-orange-500 my-10" />
      </div>

      <Modal title="Are you sure you want to reset the settings to default?" icon={<ExclamationTriangleIcon className="w-14 text-red-600" />} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Button onClick={defaultSetting} text="Yes" className="bg-green-500" />
        <Button onClick={() => setShowModal(false)} text="No" className="bg-slate-400" />
      </Modal>
      <Notification
        title="Successfully apply default settings" show={applyDefSet} />
    </>
  )
}
export default StoreSetting