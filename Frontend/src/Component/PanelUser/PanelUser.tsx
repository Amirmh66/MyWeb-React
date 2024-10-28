import "./PanelUser.css";
import Main from "./Main/Main";
import BoxManage from "./BoxManage/BoxManage";
import Title from "./Title/Title";

function PanelUser() {
  return (
    <>
      <div className="container">
        <Title />

        <div className="flex flex-col flex-grow lg:flex-row gap-10 ">
          <BoxManage />

          <Main />
        </div>
      </div>
    </>
  );
}

export default PanelUser;
