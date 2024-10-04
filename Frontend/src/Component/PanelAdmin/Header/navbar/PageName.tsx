import { useContext } from "react";
import { IPageN } from "../../../../Types/Interfaces";
import { pageContext } from "../../../Context/PageNContext";

function PageName() {
  const { currentPage }:any = useContext(pageContext);

  return (
    <>
      <div className="basis-1/5 hidden md:block">
        <p className="pg-Name">
          {currentPage}
        </p>
      </div>
    </>
  );
}

export default PageName;
