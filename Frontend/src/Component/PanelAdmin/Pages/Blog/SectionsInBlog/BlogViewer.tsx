import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiRoutes from "../../../../../Constants/apiRoutes";
import LoadingText from "../../../../Elements/LoadingText";
import { conditionStatusColor, formattedDate } from "../Utilities/Conditions"
import Button from "../../../../Elements/Buttons";
import Modal from "../../../../Elements/Modal";
import { CalendarDateRangeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
interface IBlog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string
  coverImage: string;
  author: string;
  readingTime: string;
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}
function BlogViewer() {
  const [error, setError] = useState<string | null>(null)
  const { slug } = useParams();
  const [blog, setBlog] = useState<IBlog>();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const redirect = useNavigate();
  useEffect(() => {
    if (slug) {
      getBlogBySlug(slug)
    }
  }, []);
  //#region GetBlogBySlug
  const getBlogBySlug = async (slug: string) => {
    setIsLoading(true);
    setError(null)
    try {
      const response = await fetch(apiRoutes.getBlogBySlug(slug));
      const data = await response.json();

      if (data) {
        setBlog(data.result)
      } else if (response.status >= 500 && response.status < 600) {
        setError(response.statusText)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  //#endregion
  //#region DeleteBlogById
  const handleDelete = (productId: string) => {
    setSelectedId(productId);
    setShowModal(true);
  };
  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        const response = await fetch(apiRoutes.deleteBlogById(selectedId), {
          method: 'DELETE',
        })
        if (response.status === 200) {
          setShowModal(false);
          setSelectedId(null);
          redirect("/PanelAdmin/Blogs");
        }
      } catch (error: any) {
        setError(error)
      }
    }
  };
  //#endregion

  if (error) return <span className="error">{error}</span>
  if (isLoading) return <LoadingText />
  return (
    <>
      {blog && (
        <div className="w-full bg-white rounded-lg flex flex-col gap-1 overflow-hidden">
          {error && (
            <p className="error">{error}</p>
          )}
          <div className="flex justify-start p-3">
            <Link to={`/PanelAdmin/Blogs/edit/${blog._id}`}>
              <Button className="bg-blue-600" text="Edit This Blog" icon={<PencilSquareIcon className="w-4" />} />
            </Link>
            <Button className="bg-red-600" text="Delete This Blog"
              icon={<TrashIcon className="w-4" />} onClick={() => handleDelete(blog._id)} />
          </div>
          <div className="w-ful max-h-40 mb-5">
            <img srcSet="/Images/1.jpg" className="w-full h-44 object-cover" alt={blog.coverImage} loading="lazy" />
          </div>
          <div className="px-3 flex flex-col  gap-5">
            <div className="flex items-center justify-between ">
              <p className="font-bold text-xl">{blog.title}</p>
              <p className={`${conditionStatusColor(blog.status)} status`}>{blog.status}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12">
                      <img srcSet="/Images/PicUser.png" className="rounded-full" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600">{blog.author ? (blog.author) : "Dave Gray"}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-600">
                    The required time for reading is: {blog.readingTime} minutes</p>
                </div>
                <div className="bg-slate-200 p-3 rounded-xl relative ">
                  <div className="absolute bg-slate-200 rounded-full p-2 -top-5 -left-5">
                    <CalendarDateRangeIcon className="w-8" />
                  </div>
                  <div className="flex flex-col gap-2 pt-5">
                    <p className="font-semibold ">PublishedAt : <span className="text-gray-600">{formattedDate(blog.publishedAt)}</span></p>
                    <p className="font-semibold ">UpdatedAt : <span className="text-gray-600">{formattedDate(blog.updatedAt)}</span></p>
                    <p className="font-semibold ">CreatedAt : <span className="text-gray-600">{formattedDate(blog.createdAt)}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-xl">Summary of content</label>
              <p className="font-semibold text-gray-700 ">{blog.excerpt}</p>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-xl">Content</label>
              <p className="font-semibold text-gray-700">{blog.content}</p>
            </div>
          </div>
        </div>
      )}
      <Modal title="Are you sure you want to delete this blog?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600 hover:bg-red-700" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
    </>
  )
}
export default BlogViewer