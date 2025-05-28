import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from "../Shared/Form";

interface IBlogPostForm {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  status?: string
  isPublished: boolean;
}

function BlogEditor() {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [error, setError] = useState<string | null>(null);
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getBlogById()
  }, []);
  const getBlogById = async () => {
    try {
      const response = await fetch(apiRoutes.getBlogById(id));
      if (response) {
        const data = await response.json();
        setBlog(data)
      }
    } catch (error: any) {
      setError(error)
    }
  }
  const editBlogById = async (formData: IBlogPostForm) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(apiRoutes.editBlogById(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (res.status === 200) {
        redirect("/PanelAdmin/Blogs")
      } else if (!res.ok) {
        setError("Error")
      }
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Form error={error} isEditMode={true} isLoading={isLoading} onSubmit={editBlogById} initialValues={blog} />
    </>
  )
}

export default BlogEditor
