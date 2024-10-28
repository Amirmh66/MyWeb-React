import type { IButton } from "../../Types/Interfaces";
import "../GlobalStyle/Glogbal.css";

export default function Button({ text, className, onClick, disable}: IButton) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disable}
        type="submit"
        className={`${"btn"} ${className}`}
      >
        {text}
      </button>
    </>
  );
}
