import { Link } from 'react-router-dom'

interface ImageProps {
  width: string
}

function Logo({ width }: ImageProps) {

  return (
    <>
      <Link to={"/"}>
        <img srcSet="/Images/DarwinLowQuality.webp"
          className={`${width} mx-auto cursor-pointer`} loading='lazy' alt="logo" />
      </Link>
    </>
  )

}

export default Logo
