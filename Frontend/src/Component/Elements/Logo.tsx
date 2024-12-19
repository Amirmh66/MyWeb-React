import { Link } from 'react-router-dom'

function Logo() {
  return (
    <>
      <Link to={"/"}>
        <div className="w-32 md:w-16 cursor-pointer">
          <img srcSet="/Images/DarwinLowQuality.webp" loading='eager' alt="logo" />
        </div>
      </Link>
    </>
  )
}

export default Logo
