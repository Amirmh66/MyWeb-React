import type { IButton } from "../../Types/Interfaces";
import "../GlobalStyle/Glogbal.css";

export function Button({ text, color, onClick }: IButton) {
  return (
    <>
      <button onClick={onClick} className={`${"btn"} ${color}`}>
        {text}
      </button>
    </>
  );
}
