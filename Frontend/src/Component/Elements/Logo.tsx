import { Link } from 'react-router-dom'

function Logo() {
  return (
    <>
      <Link to={"/"}>
        <div className="w-16 md:w-20 cursor-pointer">
          <img srcSet="/Images/DarwinLowQuality.webp" loading='lazy' alt="logo" />
        </div>
      </Link>
    </>
  )
}

export default Logo
