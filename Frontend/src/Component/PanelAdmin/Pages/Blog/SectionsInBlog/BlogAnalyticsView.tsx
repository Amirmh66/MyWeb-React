import { EyeIcon, GlobeAltIcon, NewspaperIcon, UsersIcon } from '@heroicons/react/20/solid'
import '../Blog.css'
import { useEffect, useState } from 'react';
import apiRoutes from '../../../../../Constants/apiRoutes';

function BlogAnalyticsView() {
    const [totalBlog, setTotalBlog] = useState(0);
    const [publishedBlogs, setPublishedBlogs] = useState(0);
    const [totalAuthors, setTotalAuthors] = useState(0);
    const [totalViews, setTotalViews] = useState(0);

    //#region GetAnalyticCoutn 
    useEffect(() => {
        getTotalBlogs();
        getPublishedBlogs();
        getTotalAuthors();
        getTotalViews();
    }, []);

    const getTotalBlogs = async () => {
        try {
            const totalBlogsResult = await fetch(apiRoutes.getTotalBlogs);
            const data = await totalBlogsResult.json();
            setTotalBlog(data);
        } catch (error) {
            console.log("error", error);
        }
    }
    const getPublishedBlogs = async () => {
        try {
            const totalPublishedResult = await fetch(apiRoutes.getPublishedBlogs);
            const data = await totalPublishedResult.json();
            setPublishedBlogs(data);
        } catch (error) {
            console.log("error", error);
        }
    }
    const getTotalAuthors = async () => {
        try {
            const totalAuthorsResult = await fetch(apiRoutes.getTotalAuthors);
            const data = await totalAuthorsResult.json();
            setTotalAuthors(data);
        } catch (error) {
            console.log("error", error);
        }
    }
    const getTotalViews = async () => {
        try {
            const totalViewsResult = await fetch(apiRoutes.getViewsResult);
            const data = await totalViewsResult.json();
            setTotalViews(data);
        } catch (error) {
            console.log("error", error);
        }
    }
    //#endregion


    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-20">
                <div className="cardAnalytic">
                    <NewspaperIcon className='w-9 text-[#2C3E50]' />
                    <h3 className="cartTitle">Total Blogs</h3>
                    <p className="cardNumber text-green-500 ">{totalBlog}</p>
                </div>
                <div className="cardAnalytic">
                    <GlobeAltIcon className='w-9 text-[#34495E]' />
                    <h3 className="cartTitle">Published Blogs</h3>
                    <p className="cardNumber text-red-500 ">{publishedBlogs}</p>
                </div>
                <div className="cardAnalytic">
                    <UsersIcon className='w-9 text-[#2C3E50]' />
                    <h3 className="cartTitle">Total Author</h3>
                    <p className="cardNumber text-blue-500 ">{totalAuthors}</p>
                </div>
                <div className="cardAnalytic">
                    <EyeIcon className='w-9 text-[#2C3E50]' />
                    <h3 className="cartTitle">Total Views</h3>
                    <p className="cardNumber text-sky-500 ">{totalViews}</p>
                </div>
            </div>
        </>
    )
}

export default BlogAnalyticsView
