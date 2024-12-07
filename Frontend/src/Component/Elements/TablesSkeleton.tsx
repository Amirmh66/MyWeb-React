import { FaDeviantart } from "react-icons/fa"

function TablesSkeleton() {

    return (
        <>
            {/* table-nav */}
            <div className="drop-shadow mb-2 p-3 bg-white dark:bg-gray-900 rounded-lg flex gap-5 items-center">
                <div className='animate-pulse flex gap-5'>
                    <button className='btn-skeleton'></button>
                    <button className='btn-skeleton'></button>
                    <button className='btn-skeleton'></button>
                </div>
            </div>

            <div className="shadow-md bg-gray-200 w-full dark:bg-gray-700 rounded-lg ">

                {/* header */}
                <div className='flex justify-start gap-48 px-5 items-center h-16' >
                    <div>
                        <div className='txt-header-skeleton'></div>
                    </div>
                    <div>
                        <div className='txt-header-skeleton'></div>
                    </div>
                    <div>
                        <div className='txt-header-skeleton'></div>
                    </div>
                </div>

                {/* body */}
                <div className="body-table">
                    {/* nameOnTr   */}
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    {/* buttons */}
                    <div className="py-2 px-5">
                        <div className='flex gap-5'>
                            <div className='btn-skeleton'></div>
                            <div className='btn-skeleton'></div>
                        </div>
                    </div>
                </div>
                <div className="body-table">
                    {/* nameOnTr   */}
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    {/* buttons */}
                    <div className="py-2 px-5 ">
                        <div className='flex gap-5'>
                            <div className='btn-skeleton'></div>
                            <div className='btn-skeleton'></div>
                        </div>
                    </div>
                </div><div className="body-table">
                    {/* nameOnTr   */}
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    {/* buttons */}
                    <div className="py-2 px-5 ">
                        <div className='flex gap-5'>
                            <div className='btn-skeleton'></div>
                            <div className='btn-skeleton'></div>
                        </div>
                    </div>
                </div><div className="body-table">
                    {/* nameOnTr   */}
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    {/* buttons */}
                    <div className="py-2 px-5 ">
                        <div className='flex gap-5'>
                            <div className='btn-skeleton'></div>
                            <div className='btn-skeleton'></div>
                        </div>
                    </div>
                </div><div className="body-table">
                    {/* nameOnTr   */}
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    <div className="py-4 px-5">
                        <div className='txt-name-On-Tr'></div>
                    </div>
                    {/* buttons */}
                    <div className="py-2 px-5 ">
                        <div className='flex gap-5'>
                            <div className='btn-skeleton'></div>
                            <div className='btn-skeleton'></div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TablesSkeleton
