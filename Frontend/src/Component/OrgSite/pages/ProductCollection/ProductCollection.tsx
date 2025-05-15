import { ArrowLeftIcon, HeartIcon, ShareIcon } from '@heroicons/react/20/solid';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductCollection = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { products, title }: any = state || {}

    if (!state) return <div>No Product Found!</div>
    return (
        <>
            <div>
                <header className='flex justify-start items-center bg-white w-full fixed p-2 z-50 gap-2 '>
                    <ArrowLeftIcon className='w-5' onClick={() => navigate(-1)} />
                    <p className='font-semibold text-sm md:text-lg'>{title}</p>
                </header>
                <div className='grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 pt-12 mx-auto'>
                    {products.map((i: any) => (
                        <div className="relative flex flex-col items-center gap-1 p-1 rounded-lg bg-white h-80 overflow-hidden">
                            <img className="object-cover lg:w-[35vh] h-auto block" srcSet={`Images/${i.imageUrl}`} alt={i.name} />
                            <div className="absolute top-[63%] lg:top-[65%] left-1 text-left flex flex-col justify-between">
                                <p className="font-semibold px-2 text-sm line-clamp-3 lg:line-clamp-2">{i.name}</p>
                            </div>
                            <div className="absolute bottom-1 left-1 flex flex-col gap-2">
                                <p className="font-bold">$ {i.price.toLocaleString()}</p>
                                <div className="flex gap-2">
                                    <HeartIcon className="w-6  text-gray-500 border-black  hover:text-red-500 " />
                                    <ShareIcon className="w-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductCollection
