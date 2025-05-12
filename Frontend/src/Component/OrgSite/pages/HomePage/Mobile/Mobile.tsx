import MostSearchedByUsers from './Sections/MostSearchedByUsers'
import ShoppingByCategories from './Sections/ShoppingByCategories'
import WebBanners from './Sections/WebBanners'
import NavbarMobile from './Sections/NavbarMobile'
import Logo from '../../../../Elements/Logo'
import SearchBox from '../Shared/SearchBox'
import BrandSpotlight from './Sections/BrandSpotlight'
import DynamicProductSlider from './Sections/DynamicProductSlider'
import "./Mobile.css";

type ProductType = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

const cardItem: ProductType[] = [
    { id: 1, name: "Xiaomi Redmi Note 13 4G 256GB Storage 8GB ", price: 100, imageUrl: "mobile.jpg" },
    { id: 2, name: "Xiaomi Redmi Note 13 4G 256GB Storage 8GB RAM", price: 80, imageUrl: "mobile.jpg" },
    { id: 3, name: "Xiaomi Redmi Note 13 4G 256GB Storage", price: 10, imageUrl: "mobile.jpg" },
    { id: 4, name: "Xiaomi Redmi Note 13 4G 256GB Storage 8GB RAM", price: 1200, imageUrl: "mobile.jpg" },
    { id: 5, name: "Xiaomi Redmi Note 13 4G 256GB ", price: 1299, imageUrl: "mobile.jpg" },
    { id: 6, name: "Xiaomi Redmi Note 13 4G 256GB Storage 8GB RA", price: 599, imageUrl: "mobile.jpg" },
]

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
                <DynamicProductSlider productsDetail={cardItem} title='Best-SellingProducts' />
                <DynamicProductSlider productsDetail={cardItem} title='Featured-Products' />
                <DynamicProductSlider productsDetail={cardItem} title='DiscountedProducts' />
                <nav>
                    <NavbarMobile />
                </nav>
            </div>
        </>
    )
}

export default Mobile
