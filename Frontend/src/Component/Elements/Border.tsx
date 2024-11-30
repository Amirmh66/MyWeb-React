
interface IBorder {
    name:string;
}

function Border({name}:IBorder) {
  return (
    <>
      <div className="flex items-center justify-center mx-10 rounded-full">
          <div className="border-t border-gray-400 flex-grow"></div>
          <span className="px-1 font-semibold text-gray-900 dark:text-gray-200 text-xl">{name}</span>
          <div className="border-t border-gray-400 flex-grow"></div>
        </div>
    </>
  )
}

export default Border
