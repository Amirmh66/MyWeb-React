import { useState } from "react";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from "../Shared/Form";
import { useNavigate } from "react-router-dom";

interface IBlogPostForm {
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    isPublished: boolean;
}

function BlogComposer() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const redirect = useNavigate()
    const sendDataToServer = async (data: IBlogPostForm) => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await fetch(apiRoutes.createBlog, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                setError("Failed to create blog post.")
            } else if (response.status === 500) {
                setError("Internal Error!")

            } else if (response.status === 201) {
                redirect("/PanelAdmin/Blogs");
            }
        } catch (error: any) {
            setError(error)
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Form isEditMode={false} isLoading={isLoading} onSubmit={sendDataToServer} error={error} />
    )
}
export default BlogComposer