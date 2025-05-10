import MostSearchedByUsers from './Sections/MostSearchedByUsers'
import ShoppingByCategories from './Sections/ShoppingByCategories'
import WebBanners from './Sections/WebBanners'
import NavbarMobile from './Sections/NavbarMobile'
import Logo from '../../../../Elements/Logo'
import SearchBox from '../Shared/SearchBox'
import BrandSpotlight from './Sections/BrandSpotlight'
import "./Mobile.css";

function Mobile() {
    return (
        <>
            <div className='mobile'>
                <Logo width="w-28" />
                <SearchBox />
                <MostSearchedByUsers />
                <WebBanners />
                <ShoppingByCategories />
                <BrandSpotlight />
                <nav>
                    <NavbarMobile />
                </nav>
            </div>
        </>
    )
}

export default Mobile
