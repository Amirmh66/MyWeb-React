import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentUserName } from "../../../Features/Authentication/AuthSlice/AuthSlice";

function Profile() {
  const userName = useSelector(selectCurrentUserName);
  const role = useSelector(selectCurrentRole);

  return (
    <>
    <div className="basis-4/5 cursor-pointer hidden md:flex color-txt">
      <img src="/Images/PicUser.png" className="size-12 rounded-md"  />

      <div className="User-AL">
        {/* UserName */}
        <p className="font-semibold">{userName}</p>
        {/* AccessLevel */}
        <p className="font-semibold text-sm">{role}</p>
      </div>

      <div className="hidden md:block w-5">
        <ChevronDownIcon />
      </div>
    </div>
    </>
  )
}

export default Profile;
