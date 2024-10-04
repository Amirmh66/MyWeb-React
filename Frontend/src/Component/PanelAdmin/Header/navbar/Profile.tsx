
import { ChebronDown } from "../../../Elements/Icons";

function Profile({Name}:any) {
  return (
    <>
      <div className="basis-4/5 md:cursor-pointer xs:hidden sm:flex color-txt">
        <img src="/Images/PicUser.png" className="size-12 rounded-md" alt="" />

        <div className="User-AL">
          {/* UserName */}
          <h5>{Name}</h5>
          {/* AccessLevel */}
          <p>Admin</p>
        </div>

        <div className="hidden md:block">
          <ChebronDown />
        </div>
      </div>
    </>
  );
}

export default Profile;
