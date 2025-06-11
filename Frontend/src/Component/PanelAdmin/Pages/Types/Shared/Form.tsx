import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import validationType from "../../../../../Validations/TypeValidation";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Button from "../../../../Elements/Buttons";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Select from 'react-select'
import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import { formattedDate } from "../../Blog/Utilities/Conditions";

interface IType {
    name: string;
    description: string;
    imageUrl: string;
    category?: ICategory;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface ICategory {
    _id: string;
    name: string
}

interface IOpiton {
    value: string;
    label: string;
}

interface Type {
    _id: string;
    name: string
}

interface CategoryAPI {
    status: string;
    data: Type[]
}

interface IForm {
    isEditMode: boolean
    initialValues?: Partial<IType> | null;
    onSubmit: (data: IType) => void
    isLoading: boolean;
    error: string | null;
}

function Form({ onSubmit, initialValues, isEditMode, isLoading, error }: IForm) {
    const [categories, setCategories] = useState<IOpiton[]>([]);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<IType>({
        resolver: yupResolver(validationType),
        defaultValues: initialValues || {}
    })
    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset]);

    const handleFormSubmit: SubmitHandler<IType> = (data) => { onSubmit(data) }

    //#region GetCategories
    useEffect(() => {
        getCategories();
    }, [categories]);
    const getCategories = async () => {
        try {
            const response = await fetch(apiRoutes.getCategories);
            const data: CategoryAPI = await response.json();
            const opt = data.data.map((item: any) => ({ value: item._id, label: item.name }))
            setCategories(opt)
        } catch (error) {
            console.log(error)
        }
    }
    //#endregion

    const customStyles = {
        singleValue: (provided: any) => ({
            ...provided,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 10px)'
        }),
        input: (provided: any) => ({
            ...provided,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='bg-white p-5 rounded-xl flex flex-col gap-5'>
                <h1 className="font-bold text-3xl"><span className="underline underline-offset-4">{isEditMode ? "Edit" : "Create"}</span> Type</h1>
                {error && (<span className="error">{error}</span>)}
                {isEditMode && (
                    <div className="flex justify-between items-center gap-5">
                        <div>
                            <label>Slug <span className="text-gray-400 text-sm">(Read Only)</span></label>
                            <input type="text" readOnly {...register('slug')} />
                        </div>
                        <div className="bg-slate-100 p-2 rounded-xl relative">
                            <CalendarDateRangeIcon className="w-8 absolute -top-4 -left-4 bg-slate-100 p-1 rounded-full" />
                            <div className="flex flex-col pt-2 gap-2 text-sm">
                                <p className="font-semibold" >UpdatedAt : <span className="text-gray-500">
                                    {initialValues?.updatedAt && (formattedDate(initialValues?.updatedAt))}</span></p>
                                <p className="font-semibold" >CreatedAt : <span className="text-gray-500">
                                    {initialValues?.createdAt && (formattedDate(initialValues?.createdAt))}</span></p>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <label>Name</label>
                    <input type="text" {...register('name')} placeholder="Enter type name" />
                    {errors.name && <span className='error'>{errors.name.message}</span>}
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <label>ImageUrl</label>
                        <input type="text" {...register('imageUrl')} placeholder="Enter image URL" />
                        {errors.imageUrl && <span className='error'>{errors.imageUrl.message}</span>}
                    </div>
                    <div className="w-[50vh]">
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: 'Select category is required!' }}
                            render={({ field }) => (
                                <Select<IOpiton>
                                    isSearchable={true}
                                    styles={customStyles}
                                    options={categories}
                                    onChange={(selectedOption: IOpiton | null) => field.onChange(selectedOption ? selectedOption.value : null)}
                                    value={categories.find(option => option.value === field.value?._id)}
                                    placeholder={initialValues?.category?.name ? (initialValues?.category.name) : "Choose Category"} />
                            )}
                        />
                        {errors.category && <span className="error">{errors.category.message}</span>}
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <textarea rows={3} {...register('description')} placeholder="Enter description..." />
                    {errors.description && <span className='error'>{errors.description.message}</span>}
                </div>
                <div className='flex justify-end mt-10'>
                    {isEditMode ? (
                        <Button text={`${isLoading ? 'Edit Type...' : 'Submit'}`}
                            disable={isLoading} className='bg-blue-600' type='submit' />
                    ) : (
                        <Button text={`${isLoading ? 'Creating a Type...' : 'Submit'}`}
                            disable={isLoading} className='bg-green-600' type='submit' />
                    )}
                </div>
            </form>
        </>
    )
}

export default Form
