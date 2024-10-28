import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Language() {
  return (
    <>
      <div className="Lang">
        <img
          srcSet="/Images/usaflag.jpeg"
          className="size-6 rounded-full"
          alt="usaflag"
        />
        <span className="pl-2 font-bold">Eng (US)</span>
        <ChevronDownIcon />
      </div>
    </>
  );
}

export default Language;
