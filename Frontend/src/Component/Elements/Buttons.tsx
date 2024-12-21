import type { IButton } from "../../Types/Interfaces";
import "../GlobalStyle/Glogbal.css";

export default function Button({ text, className, onClick, disable, icon }: IButton) {
  return (
    <>
        <button
          onClick={onClick}
          disabled={disable}
          type="submit"
          className={`${"btn"} ${className}`}
        >
          <div className="flex gap-2">
            {icon}
            {text}
          </div>
        </button>
    </>
  );
}
