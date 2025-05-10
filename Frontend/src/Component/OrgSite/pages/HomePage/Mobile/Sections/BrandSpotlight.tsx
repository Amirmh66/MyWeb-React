import { BeakerIcon, BugAntIcon } from '@heroicons/react/20/solid';
import '../Mobile.css';

function BrandSpotlight() {
    return (
        <>
            <div className="flex flex-col gap-5 mx-1 mb-20">
                <div className="flex gap-2">

                    <div className="brandSpot-Cart">
                        <div className='brandDetail'>
                            <BeakerIcon className='w-7' />
                            <p className='brandName'>Samsung</p>
                        </div>

                        <div>
                            <img srcSet='Images/Samsung.png' className='brandImg' alt="" />
                        </div>

                        <div className='seeMoreBottom'>
                            <p className='seeMoreBottom-text'>See More</p>
                        </div>
                    </div>

                    <div className="brandSpot-Cart">
                        <div className='brandDetail'>
                            <BugAntIcon className='w-7' />
                            <p className='brandName'>Apple</p>
                        </div>
                        <div>
                            <img srcSet='Images/IPhone.png' className="brandImg" alt="samsungPicture" />
                        </div>
                        <div className='seeMoreBottom'>
                            <p className='seeMoreBottom-text'>See More</p>
                        </div>
                    </div>

                </div>
                <div className='flex justify-center items-center gap-3'>

                    <div className='brandSpot-Cart-Small'>
                        <img srcSet='Images/IPhone.png' className="brandImg pt-20" alt="iphoenPicture" />
                        <div className='seeMoreBottom-Small'>
                            <p className='seeMoreBottom-text-Small'>Huawei</p>
                        </div>
                    </div>

                    <div className='brandSpot-Cart-Small'>
                        <img srcSet='Images/IPhone.png' className="brandImg pt-20" alt="samsungPicture" />
                        <div className='seeMoreBottom-Small'>
                            <p className='seeMoreBottom-text-Small'>Xiaomi</p>
                        </div>
                    </div>

                    <div className='brandSpot-Cart-Small'>
                        <img srcSet='Images/IPhone.png' className="brandImg pt-20" alt="samsungPicture" />
                        <div className='seeMoreBottom-Small'>
                            <p className='seeMoreBottom-text-Small'>Nokia</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BrandSpotlight
