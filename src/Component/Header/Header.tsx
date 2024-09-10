import './Header.css'

export default function Header() {

  return (
<>
      {/* Navbar  */}
      <nav className="bg-darkMode p-6 h-24">

           {/* Navbar  */}
       <div className="flex items-center justify-center">

          {/* PageName  */}
          <div className="basis-1/5 hidden md:block">
            <p className="font-bold color-txt text-lg md:text-xl lg:text-2xl">Dashboard</p>
          </div>
          {/* SearchBox */}
          <div className="basis-2/5 mx-7 lg:mx-8 relative flex items-center drop-shadow">

            <span className="p-2 absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-violet-800" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input type="text" className='SearchBox' placeholder='Search here...' />
          </div>
          {/* Choose-Language  */}
          <div className="basis-3/5 cursor-pointer items-center hidden md:flex color-txt">
            <img srcSet='./public/Images/usaflag.jpeg' className="size-6 rounded-full" alt="usaflag" />
            <span className="pl-2 font-bold">Eng (US)</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" className="size-4 my-1 mx-1 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
            {/* Theme  */}
          <div className="hidden lg:flex color-txt">
              {/* Button  */}
              <button type="button" className="hover:bg-gray-200 rounded-full p-2 dark:hover:bg-gray-800">

                 {/* dark  */}
                <div  x-bind:className="darkMode ? 'hidden' : 'block' ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
            </div>

             {/* Light  */}
            <div x-bind:className=" darkMode ? 'block' : 'hidden' ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </div>

        </button>
           </div>
          {/* Bell & Notification  */}
          <div className="bg-yellow-200 p-2 rounded-lg mx-5 hidden md:block ">
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="size-6 text-yellow-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </a>

            <span className="bg-red-600">

            </span>

          </div>
          {/* Profile */}
          <div className="basis-4/5 md:cursor-pointer xs:hidden sm:flex color-txt">
            <img src="/public/Images/PicUser.png" className="size-12 rounded-md" alt="" />

            <div className="text-start md:pl-2">
              <span className="font-bold hidden md:block">Mamad</span>
              <p className=" font-thin hidden md:block">Admin</p>
            </div>

            <div className=" hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="size-small my-1 mx-1 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

          </div>

        </div>
        
      </nav>
</>
  )
}

