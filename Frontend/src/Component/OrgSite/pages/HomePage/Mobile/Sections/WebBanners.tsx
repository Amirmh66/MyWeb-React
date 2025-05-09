import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IType {
  id: number;
  src: string;
  title: string;
}

const images: IType[] = [
  { id: 1, src: "Images/1.jpg", title: "test Image" },
  { id: 2, src: "Images/3.jpg", title: "test Image" },
  { id: 3, src: "Images/1.jpg", title: "test Image" },
  { id: 4, src: "Images/3.jpg", title: "test Image" },
]

function WebBanners() {
  return (
    <>
      <Swiper
        modules={[FreeMode]}
        className="w-full md:hidden"
        spaceBetween={15}
        slidesPerView={1.5}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 1.2,
          momentumBounce: false,
          momentumVelocityRatio: 0.5,
          sticky: false,
          minimumVelocity: 0.1,
        }}
      >
        {images.map((i) => (
          <SwiperSlide key={i.id} className='overflow-hidden w-full rounded-3xl select-none'>
            <img key={i.id} srcSet={i.src} alt={i.title} className='object-cover' width="350" height="250" />
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  )
}

export default WebBanners
