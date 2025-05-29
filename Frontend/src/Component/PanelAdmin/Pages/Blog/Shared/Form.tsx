import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import validationBlog from '../../../../../Validations/BlogValidation';
import { useEffect } from 'react';
import Button from '../../../../Elements/Buttons';
import Select from 'react-select';

interface IBlogPostForm {
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    status?: string
    isPublished: boolean;
}
interface IForm {
    isEditMode: boolean
    initialValues?: Partial<IBlogPostForm> | null;
    onSubmit: (data: IBlogPostForm) => void
    isLoading: boolean;
    error: string | null;
}

interface StatusType {
    value: string;
    label: string;
}

const statusOption: StatusType[] = [
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' },
    { value: 'pending', label: 'Pending' },
    { value: 'draft', label: 'Draft' }
]

function Form({ onSubmit, initialValues, isEditMode, isLoading, error }: IForm) {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<IBlogPostForm>({
        resolver: yupResolver(validationBlog),
        defaultValues: initialValues || {}
    });

    const handleFromSubmit: SubmitHandler<IBlogPostForm> = (data) => { onSubmit(data) }
    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset]);
    return (
        <>
            <form onSubmit={handleSubmit(handleFromSubmit)} className='bg-white p-5 rounded-xl flex flex-col gap-5'>
                <h1 className="font-bold text-3xl">
                    <span className="underline underline-offset-4">{isEditMode === true ? "Edit" : "Create"}</span> Blog
                </h1>
                <span className="error">{error}</span>
                <div>
                    <label>Title</label>
                    <input type='text' placeholder='Enter your captivating and engaging title here...'
                        {...register('title', { maxLength: 70, minLength: 20 })} />
                    {errors.title && <span className='error'>{errors.title.message}</span>}

                </div>
                <div>
                    <label>Content</label>
                    <textarea placeholder="Enter your full blog content here..."
                        {...register('content')} rows={5} />
                    {errors.content && <span className='error'>{errors.content.message}</span>}
                </div>
                <div>
                    <label>Excerpt</label>
                    <textarea placeholder='Write a short and compeling summary of your post...'
                        {...register('excerpt')} rows={3} />
                    {errors.excerpt && <span className='error'>{errors.excerpt.message}</span>}
                </div>
                <div className='flex flex-col gap-3'>
                    <div>
                        <label >CoverImage</label>
                        <input type="file" {...register('coverImage')} />
                    </div>
                    {isEditMode && (
                        <div className='w-1/4'>
                            <label>Status</label>
                            <Controller name='status'
                                control={control}
                                render={({ field }) => (
                                    <Select<StatusType>
                                        {...field}
                                        value={statusOption.find(opt => opt.value === field.value)}
                                        onChange={(selectedOpt) => (
                                            field.onChange(selectedOpt ? selectedOpt.value : null)
                                        )}
                                        options={statusOption}
                                        isSearchable={false}
                                        placeholder={initialValues?.status}
                                    />
                                )}
                            />
                        </div>
                    )}
                    <div className='flex gap-5'>
                        <label>IsPublished?</label>
                        <input type="checkbox" {...register('isPublished')} />
                    </div>
                </div>
                <div className='flex justify-end mt-10'>
                    {isEditMode ? (
                        <Button text={`${isLoading ? 'Edit blog....' : 'Submit'}`}
                            disable={isLoading} className='bg-blue-600' type='submit' />
                    ) : (

                        <Button text={`${isLoading ? 'Creating a blog....' : 'Submit'}`}
                            disable={isLoading} className='bg-green-600' type='submit' />
                    )}
                </div>
            </form >
        </>
    )
}

export default Form
