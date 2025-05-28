import { EyeIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Button from "../../../../Elements/Buttons";
import '../Blog.css'
import SortControl from "./SortControl";
import { useState } from "react";
import { Link } from "react-router-dom";
import { conditionStatusColor, headerText, formattedDate } from "../Utilities/Conditions";
interface BlogType {
    _id: number;
    title: string;
    slug: string;
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
    return (
        <div className="bg-white rounded-xl h-full overflow-hidden shadow-sm w-full">
            <div className='py-3 px-2 shadow-lg flex justify-between items-center'>
                <p className='font-bold pl-2'>{headerText(sortName)} Blogs</p>
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
                            <td className="w-[30%]">
                                <p className=" font-bold text-sm line-clamp-1">{b.title}</p>
                            </td>
                            <td>
                                <p className="font-semibold">{"Dave Gray"}</p>
                            </td>
                            <td>
                                <p className="font-semibold">{formattedDate(b.publishedAt)}</p>
                            </td>
                            <td>
                                <p className={`${conditionStatusColor(b.status)} status`}>{b.status}</p>
                            </td>
                            <td className="flex">
                                <Link to={`edit/${b._id}`} title="Edit This Blog">
                                    <Button className="bg-blue-500" icon={<PencilSquareIcon className="w-4" />} />
                                </Link>
                                <Link to={`detail/${b.slug}`} title={`Show detail of ${b.slug}`}>
                                    <Button className="bg-yellow-500" icon={<EyeIcon className="w-4" />} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default CartBlog