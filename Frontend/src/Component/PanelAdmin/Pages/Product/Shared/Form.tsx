import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import validationProduct from "../../../../../Validations/ProductValidation";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { CalendarDateRangeIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Button from "../../../../Elements/Buttons";
import { formattedDate } from "../../Blog/Utilities/Conditions";
import Select from 'react-select'
import apiRoutes from "../../../../../Constants/apiRoutes";

interface IProduct {
    name: string;
    slug?: string
    price: number;
    stock: number;
    description: string
    imageUrl: string
    updatedAt?: Date
    createdAt?: Date
    brand?: Type
    type?: Type
    category?: Type
}
interface IOpiton {
    value: string;
    label: string;
}

interface Type {
    _id: string;
    name: string
}

interface BrandAPI {
    status: string
    data: Type[]
}
interface TypeAPI {
    status: string
    data: Type[]
}
interface CategoryAPI {
    status: string
    data: Type[]
}

interface IForm {
    isEditMode: boolean
    initialValues?: Partial<IProduct> | null;
    onSubmit: (data: IProduct) => void
    isLoading: boolean;
    error: string | null;
}

function Form({ onSubmit, initialValues, isEditMode, isLoading, error }: IForm) {
    console.log("Category",initialValues?.category)
    console.log("Brand",initialValues?.brand)
    console.log("Type",initialValues?.type)
    const [brands, setBrands] = useState<IOpiton[]>([])
    const [types, setTypes] = useState<IOpiton[]>([])
    const [categories, setCategories] = useState<IOpiton[]>([])
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<IProduct>({
        resolver: yupResolver(validationProduct),
        defaultValues: initialValues || {}
    })
    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset]);

    const handleFormSubmit: SubmitHandler<IProduct> = (data) => { onSubmit(data) }

    //#region getBrands
    useEffect(() => {
        getBrands()
    }, []);
    const getBrands = async () => {
        const brands = await fetch(apiRoutes.getBrands);
        const data: BrandAPI = await brands.json();
        const opt = data.data.map((item: any) => ({ value: item._id, label: item.name }))
        setBrands(opt)
    }
    //#endregion
    //#region getTypes
    useEffect(() => {
        getTypes()
    }, []);
    const getTypes = async () => {
        const types = await fetch(apiRoutes.getTypes);
        const data: TypeAPI = await types.json();
        const opt = data.data.map((item: any) => ({ value: item._id, label: item.name }))
        setTypes(opt)
    }
    //#endregion
    //#region getCategories
    useEffect(() => {
        getCategories()
    }, []);
    const getCategories = async () => {
        const categories = await fetch(apiRoutes.getCategories);
        const data: CategoryAPI = await categories.json();
        const opt = data.data.map((item: any) => ({ value: item._id, label: item.name }))
        setCategories(opt)
    }
    //#endregion

    const customStyles = {
        menu: (provided: any) => ({
            ...provided,
            width: "150px",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 8px)'
        }),
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
                <h1 className="font-bold uppercase text-3xl">
                    <span className="underline underline-offset-4">{isEditMode === true ? "Edit" : "Create"}</span> Product
                </h1>
                {error && (
                    <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon className="w-5 text-red-500" />
                        <span className="error">{error}</span>
                    </div>
                )}
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
                    <label>Name:</label>
                    <input type="text" placeholder="Enter product name"  {...register('name')} />
                    {errors.name && <span className='error'>{errors.name.message}</span>}
                </div>

                <div className="flex gap-5">
                    <div className="w-full">
                        <label>Price:</label>
                        <input type="number" placeholder="Enter Price"  {...register('price')} />
                        {errors.price && <span className='error'>{errors.price.message}</span>}

                    </div>
                    <div className="w-full">
                        <label>Stock:</label>
                        <input type="number" placeholder="Enter stock quantity"  {...register('stock')} />
                        {errors.stock && <span className='error'>{errors.stock.message}</span>}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 w-max bg-whtie m-auto rounded-lg">
                        <div
                            className="file_upload p-5 w-[380px] relative border-4 border-dotted border-gray-300 dark:border-gray-950 rounded-lg" >
                            <div className="input_field flex flex-col w-max mx-auto text-center">
                                <label>
                                    <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple
                                        {...register('imageUrl')} />
                                    <div
                                        className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500" >
                                        Select
                                    </div>
                                </label>

                                <div className="title text-indigo-500 uppercase">
                                    or drop files here
                                </div>
                            </div>
                        </div>
                        {errors.imageUrl && <span className='error'>{errors.imageUrl.message}</span>}

                    </div>
                    <div className="mx-5 p-5 border rounded-xl relative">
                        <div className="-top-3 -left-2 absolute bg-white">
                            <p className="font-semibold text-sm">Product Attributes</p>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <Controller
                                    name="brand"
                                    control={control}
                                    rules={{ required: 'Select brand is required!' }}
                                    render={({ field }) => (
                                        <Select<IOpiton>
                                            {...field}
                                            isSearchable={true}
                                            styles={customStyles}
                                            options={brands}
                                            onChange={(selectedOption: IOpiton | null) => field.onChange(selectedOption ? selectedOption.value : null)}
                                            value={brands.find(option => option.value === field.value?._id)}
                                            placeholder={initialValues?.brand?.name ? (initialValues?.brand?.name) : "Choose Brand"} />
                                    )}
                                />
                            </div>
                            <div>
                                <Controller
                                    name="type"
                                    control={control}
                                    rules={{ required: 'Select type is required!' }}
                                    render={({ field }) => (
                                        <Select<IOpiton>
                                            {...field}
                                            isSearchable={true}
                                            styles={customStyles}
                                            options={types}
                                            onChange={(selectedOption: IOpiton | null) => field.onChange(selectedOption ? selectedOption.value : null)}
                                            value={types.find(option => option.value === field.value?._id)}
                                            placeholder={initialValues?.type?.name ? (initialValues?.type?.name) : "Choose Type"} />
                                    )}
                                />
                            </div>
                            <div>
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
                                            placeholder={initialValues?.category?.name ? (initialValues?.category?.name) : "Choose Category"} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea rows={5} placeholder="Enter product description"  {...register('description')} />
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
            </form>
        </>
    )
}

export default Form
