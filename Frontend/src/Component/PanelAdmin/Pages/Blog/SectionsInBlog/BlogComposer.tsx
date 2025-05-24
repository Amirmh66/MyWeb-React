import { useForm, SubmitHandler } from 'react-hook-form';
import '../../../PanelAdminStyle/Styles.css'
import Button from '../../../../Elements/Buttons';
import validationBlog from '../../../../../Validations/BlogValidation';
import { yupResolver } from '@hookform/resolvers/yup'
import apiRoutes from '../../../../../Constants/apiRoutes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface IBlogPostForm {
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    isPublished: boolean;
}
function BlogComposer() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const redirect = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IBlogPostForm>({
        resolver: yupResolver(validationBlog),
        defaultValues: {
            title: '',
            content: '',
            excerpt: '',
            coverImage: 'image.png',
            isPublished: false
        }
    });
    const onSubmit: SubmitHandler<IBlogPostForm> = (data) => sendBlogToServer(data)
    //#region SendBlogToServer
    const sendBlogToServer = async (data: IBlogPostForm) => {
        setError(null)
        setIsLoading(true)
        try {
            await fetch(apiRoutes.createBlog, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(async (res) => {
                if (res.status === 201) {
                    redirect("/PanelAdmin/Blogs");
                    return;
                }
                const errorData = await res.json();
                const errorMessage = errorData.message || 'Undenified Error';
                if (res.status === 409) {
                    setError(errorMessage)
                } else if (res.status >= 400 && res.status < 500) {
                    setError(errorMessage)
                } else if (res.status >= 500 && res.status < 600) {
                    setError(errorMessage)
                } else {
                    setError("Unexpected response from the server!" + errorMessage)
                }
            })
        } catch (error: any) {
            setError("Error in server communication or data processing!")
        } finally {
            setIsLoading(false)
        }
    }
    //#endregion
    return (
        <>
            <div className='flex flex-col max-w-full overflow-hidden'>
                <form onSubmit={handleSubmit(onSubmit)}
                    className='bg-white rounded-xl p-10 flex gap-5 flex-col w-full'>
                    <p className='text-red-700 font-semibold'>{error}</p>
                    <div>
                        <label>Title</label>
                        <input type='text' {...register('title', { required: 'Title is required!' })}
                            placeholder='Enter your captivating and engaging title here...' />
                        {errors.title && <span className='error'>{errors.title.message}</span>}
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea placeholder="Enter your full blog content here..." {...register('content', { required: "Content Is Required!" })} />
                        {errors.content && <span className='error'>{errors.content.message}</span>}
                    </div>
                    <div>
                        <label>Excerpt</label>
                        <textarea placeholder='Write a short and compelling summary of your post...'
                            {...register('excerpt', { required: 'Excerpt is required!', maxLength: 300 })} />
                        {errors.excerpt && <span className='error'>{errors.excerpt.message}</span>}
                    </div>
                    <div>
                        <label >CoverImage</label>
                        <input type="file" {...register('coverImage')} />
                        {errors.coverImage && <span className='error'>{errors.coverImage.message}</span>}
                    </div>
                    <div className='flex gap-2'>
                        <label>IsPublished?</label>
                        <input type="checkbox" {...register('isPublished')} />
                    </div>
                    <div className='flex justify-end mt-10'>
                        <Button text={`${isLoading ? 'Creating a blog....' : 'Submit'}`}
                            disable={isLoading} className='bg-green-600' type='submit' />
                    </div>
                </form>
            </div>
        </>
    )
}
export default BlogComposer