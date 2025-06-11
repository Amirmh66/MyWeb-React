import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form'
import validationBrand from '../../../../../Validations/BrandValidation';
import Button from '../../../../Elements/Buttons';
import { useEffect } from 'react';
import { IBrand } from '../../../../../Types/Interfaces';

interface IForm {
    isEditMode: boolean
    initialValues?: Partial<IBrand> | null;
    onSubmit: (data: IBrand) => void
    isLoading: boolean;
    error: string | null;
}

function From({ onSubmit, initialValues, isEditMode, isLoading, error }: IForm) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IBrand>({
        resolver: yupResolver(validationBrand),
        defaultValues: initialValues || {}
    })
    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset]);

    const handleFormSubmit: SubmitHandler<IBrand> = (data) => { onSubmit(data) }
    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='bg-white p-5 rounded-xl flex flex-col gap-5'>
                <h1 className="font-bold text-3xl">
                    <span className="underline underline-offset-4">{isEditMode === true ? "Edit" : "Create"}</span> Brand
                </h1>
                <span className="error">{error}</span>

                <div className='flex gap-10'>
                    <div className='w-full'>
                        <label>Name</label>
                        <input type="text" {...register('name')} placeholder='e.g. , Sony' />
                        {errors.name && <span className='error'>{errors.name.message}</span>}
                    </div>
                    <div className='w-full'>
                        <label>WebSiteUrl</label>
                        <input type="text" {...register('websiteUrl')} placeholder='e.g. , https://www.example.com' />
                        {errors.websiteUrl && <span className='error'>{errors.websiteUrl.message}</span>}
                    </div>
                </div>
                <div className='flex gap-10'>
                    <div className='w-full'>
                        <label>Country Of Origin</label>
                        <input type="text" {...register('countryOfOrigin')} placeholder='e.g. , United State' />
                        {errors.countryOfOrigin && <span className='error'>{errors.countryOfOrigin.message}</span>}
                    </div>
                    <div className='w-full'>
                        <label>EstablishedYear</label>
                        <input type="number" {...register('establishedYear')} placeholder='e.g. , 1990' />
                        {errors.establishedYear && <span className='error'>{errors.establishedYear.message}</span>}
                    </div>
                </div>
                <div>
                    <label>LogoUrl</label>
                    <input type="text" {...register('logoUrl')} placeholder='e.g. , https://www.example.com/logo.png' />
                    {errors.logoUrl && <span className='error'>{errors.logoUrl.message}</span>}
                </div>
                <div>
                    <label>Description</label>
                    <textarea {...register('description')} rows={3} placeholder='Provide a brief description of the company' />
                    {errors.description && <span className='error'>{errors.description.message}</span>}
                </div>

                <div className='flex justify-end mt-10'>
                    {isEditMode ? (
                        <Button text={`${isLoading ? 'Edit Brand....' : 'Submit'}`}
                            disable={isLoading} className='bg-blue-600' type='submit' />
                    ) : (
                        <Button text={`${isLoading ? 'Creating a Brand....' : 'Submit'}`}
                            disable={isLoading} className='bg-green-600' type='submit' />
                    )}
                </div>
            </form >
        </>
    )
}

export default From
