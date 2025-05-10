import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// row 3
// column 7

interface IType {
    id: number;
    categoryName: string;
}

function ShoppingByCategories() {

    const row = 3;
    const column = 9;

    const items = Array.from({ length: 21 }, (_, index) => ({
        id: index + 1,
        categoryName: `Item ${index + 1}`,
    }))

    const categoryItem: typeof items[] = [];
    for (let i = 0; i < items.length; i += column) {
        categoryItem.push(items.slice(i, i + column));
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
                            <div className='grid grid-cols-3 gap-2 w-full'>
                                {row.map((i) => (
                                    <div key={i.id} className="flex flex-col justify-center items-center">
                                        <div className='w-20 h-20 bg-gray-200 rounded-full'>
                                            <img src="" alt="" />
                                        </div>
                                        <p className='font-semibold'>
                                            {i.categoryName}
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
