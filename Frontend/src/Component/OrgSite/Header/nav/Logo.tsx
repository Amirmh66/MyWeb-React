import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <>
       <Link to={"/"}>
        <div className="w-32 md:w-16 cursor-pointer">
          <img srcSet="/Images/Darwin.png" alt="" />
        </div>
        </Link>
    </>
  )
}

export default Logo
