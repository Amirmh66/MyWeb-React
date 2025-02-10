import { BellIcon } from "@heroicons/react/24/outline"

function Notification() {
  return (
    <>
      <div className="bg-yellow-100 p-2 rounded-lg mx-5 hidden md:block relative group cursor-pointer ">
        <div className="absolute bg-red-600 rounded-full w-2 h-2 inline-block top-1 right-1"></div>
        <BellIcon className='w-7 text-yellow-500 group-hover:rotate-12 transition-all duration-150 ease-linear' />
      </div>
    </>
  )
}

export default Notification
