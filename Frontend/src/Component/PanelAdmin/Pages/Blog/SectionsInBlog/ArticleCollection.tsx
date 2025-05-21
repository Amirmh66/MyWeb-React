import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "../../../../Elements/Buttons";
import '../Blog.css'
import SortControl from "./SortControl";
import { useState } from "react";
import { Link } from "react-router-dom";

interface BlogType {
    _id: number;
    title: string;
    publishedAt: Date
    coverImage: string
    author: IAuthor;
    status: string;
}
interface IAuthor {
    fullName: string;
    imageURL: string;
}
interface IType {
    blogSort: {
        result: BlogType[];
        status: string;
        sort: string;
    }
}
function CartBlog() {
    const [blogSort, setBlogSort] = useState<IType[] | any>();
    const sortName = blogSort?.sort;
    const blogsToDisplay = blogSort?.result;
    const status = blogSort?.status;
    const formattedPublishedDate = (dateString: Date) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
        return `${formattedDate}`
    }
    //#region Condition If
    const conditionStatusColor =
        status === 'draft' ? 'draft' :
            status === 'pending' ? 'pending' :
                status === 'archived' ? 'archived' :
                    status === 'published' ? 'published' : 'published'
    const result =
        sortName === 'date-desc' ? 'Newest' :
            sortName === 'date-asc' ? 'Oldest' :
                sortName === 'views-desc' ? 'Most Viewed' :
                    sortName === 'views-asc' ? 'Least Viewed' : 'Newest';
    //#endregion
    return (
        <div className="bg-white rounded-xl h-full overflow-hidden shadow-sm w-full">
            <div className='py-3 px-2 shadow-lg flex justify-between items-center'>
                <p className='font-bold pl-2'>10 {result} Blogs</p>
                <SortControl onSort={(sortedItems: any) => setBlogSort(sortedItems)} />
                <Link to={"BlogComposer"}>
                    <Button className='bg-green-500 px-10' text="New" />
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Published Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Command</th>
                    </tr>
                </thead>
                <tbody>
                    {blogsToDisplay && Array.isArray(blogsToDisplay) && blogsToDisplay.map((b) => (
                        <tr key={b._id}>
                            <td className=" max-w-[50%] font-bold">{b.title}</td>
                            <td>{"Dave Gray"}</td>
                            <td>{formattedPublishedDate(b.publishedAt)}</td>
                            <td>
                                <p className={`${conditionStatusColor} px-3 py-1 font-semibold text-sm text-center rounded-md`}>{b.status}</p>
                            </td>
                            <td className="flex">
                                <Button className="bg-red-500" icon={<TrashIcon className="w-4" />} />
                                <Button className="bg-blue-500" icon={<PencilSquareIcon className="w-4" />} />
                                <Button className="bg-yellow-500" icon={<EyeIcon className="w-4" />} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CartBlog
