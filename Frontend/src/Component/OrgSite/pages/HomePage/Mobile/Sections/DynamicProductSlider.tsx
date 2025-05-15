import { ShareIcon, HeartIcon } from "@heroicons/react/20/solid"
import { Link } from "react-router-dom";
// import { HeartIcon } from "@heroicons/react/24/outline"
import { Swiper, SwiperSlide } from "swiper/react"

type ProductType = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

const DynamicProductSlider = ({ products, title }: { products: ProductType[]; title: string }) => {
    const productsList = products;
    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <p className="font-bold">{title}</p>
                    <Link to={"/productCollection"}
                        state={{
                            products: productsList,
                            title: title
                        }}>
                        <p className="text-blue-500 font-bold hover:text-blue-700">Show all</p>
                    </Link>
                </div>
                <div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={2.1}
                        freeMode={true}>
                        {productsList.map((i) => (
                            <SwiperSlide key={i.id}>
                                <div className="relative flex flex-col gap-1 p-1 rounded-lg bg-white h-80 overflow-hidden">
                                    <img className="object-cover" srcSet={`Images/${i.imageUrl}`} alt={i.name} />
                                    <div className="absolute top-[55%] left-1 text-left flex flex-col justify-between">
                                        <p className="font-semibold px-2 text-sm line-clamp-3">{i.name}</p>
                                    </div>
                                    <div className="absolute bottom-1 left-1 flex flex-col gap-2">
                                        <p className="font-bold">$ {i.price.toLocaleString()}</p>
                                        <div className="flex gap-2 ">
                                            <HeartIcon className="w-6  text-gray-500 border-black  hover:text-red-500 " />
                                            <ShareIcon className="w-6" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div >
        </>
    )
}

export default DynamicProductSlider
