import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../../Provider/AuthProvider";

function Profile() {
  const auth = useAuth();

  return (
    <>
      <div className="basis-4/5 md:cursor-pointer xs:hidden sm:flex color-txt">
        <img src="/Images/PicUser.png" className="size-12 rounded-md" alt="" />

        <div className="User-AL">
          {/* UserName */}
          <h5>{auth?.userName}</h5>
          {/* AccessLevel */}
          <p className="font-semibold text-sm">{auth?.role}</p>
        </div>

        <div className="hidden md:block">
          <ChevronDownIcon />
        </div>
      </div>
    </>
  );
}

export default Profile;
