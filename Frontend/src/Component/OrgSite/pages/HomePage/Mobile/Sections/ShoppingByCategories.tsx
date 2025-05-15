import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import API from "../../../../../../Constants/apiRoutes";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface CategoryType {
    _id: number;
    name: string;
}

function ShoppingByCategories() {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            await axios.get(API.getCategories).then((res) => {
                setCategories(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const categoryItem: typeof categories[] = [];
    for (let i = 0; i < categories.length; i += 9) {
        categoryItem.push(categories.slice(i, i + 9));
    }

    return (
        <>
            <p className='font-semibold md:hidden'>Shopping by Categories</p>
            <div className="space-y-3 w-full md:hidden">
                <Swiper
                    modules={[FreeMode]}
                    slidesPerView={1.1}
                    spaceBetween={16}
                    touchStartPreventDefault={false}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                        momentumRatio: 1,
                        momentumBounce: true,
                        momentumBounceRatio: 0.1,
                        momentumVelocityRatio: 0.2,
                        sticky: false
                    }}
                >
                    {categoryItem.map((row, rowIndex) => (
                        <SwiperSlide key={`row-${rowIndex}`} className="select-none">
                            <div className='grid grid-cols-3 gap-8 w-full'>
                                {row.map((i) => (
                                    <div key={i._id} className="flex flex-col justify-between items-center">
                                        <div className='w-20 h-20 bg-gray-200 rounded-full'></div>
                                        {/* <img key={i._id} srcSet='' className='absolute top-0 w-20 h-auto' /> */}
                                        <p className='font-semibold text-sm'>
                                            {i.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default ShoppingByCategories
