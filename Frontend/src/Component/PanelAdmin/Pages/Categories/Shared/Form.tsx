import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import validationCategory from '../../../../../Validations/ValidCategoryies';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import Button from '../../../../Elements/Buttons';
import { formattedDate } from '../../Blog/Utilities/Conditions';
import { CalendarDateRangeIcon } from '@heroicons/react/20/solid';
import apiRoutes from '../../../../../Constants/apiRoutes';
import Select from 'react-select';
import { MultiValue } from 'react-select';


interface ICategories {
    name: string
    description: string
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    types?: string[]
}

interface IType {
    _id: string;
    name: string;
}

interface IAPIRespnse {
    status: string;
    data: IType[]
}
interface IOption {
    value: string;
    label: string;
}

interface IForm {
    isEditMode: boolean
    initialValues?: Partial<ICategories> | null;
    onSubmit: (data: ICategories) => void
    isLoading: boolean;
    error: string | null;
}

function Form({ onSubmit, initialValues, isEditMode, isLoading, error }: IForm) {
    const [types, setTypes] = useState<IOption[]>([]);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ICategories>({
        resolver: yupResolver(validationCategory),
        defaultValues: initialValues || {}
    });
    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset]);

    const handleFormSubmit: SubmitHandler<ICategories> = (data) => { onSubmit(data) }

    //#region GetTypes
    useEffect(() => {
        getTypes();
    }, []);
    const getTypes = async () => {
        try {
            const response = await fetch(apiRoutes.getTypes);
            const data: IAPIRespnse = await response.json();
            const opt = data.data.map((item: any) => ({ value: item._id, label: item.name }))
            setTypes(opt);
        } catch (error) {

        }
    }
    //#endregion
    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='bg-white p-5 rounded-xl flex flex-col gap-5'>
                <h1 className="font-bold uppercase text-3xl">
                    <span className="underline underline-offset-4">{isEditMode === true ? "Edit" : "Create"}</span> Category
                </h1>
                {error && <span className='error'>{error}</span>}
                <div className='flex flex-col gap-5'>
                    {isEditMode && (
                        <div className="flex justify-between">
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
                    <div className="flex justify-between  items-center ">
                        <div>
                            <label>Name</label>
                            <input placeholder='Enter category name...' type="text" {...register('name')} />
                            {errors.name && <span className='error'>{errors.name.message}</span>}
                        </div>
                        <div >
                            <Controller
                                name="types"
                                control={control}
                                rules={{ required: 'Select a type is requird' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isSearchable={true}
                                        placeholder="Choose Type"
                                        isMulti={true}
                                        options={types}
                                        onChange={(newValue: MultiValue<IOption>) => {
                                            field.onChange(newValue.map(opt => opt.value))
                                        }}
                                        value={types.filter(option => field.value?.includes(option.value))}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea placeholder='Enter describe for category...' rows={2} {...register("description")} />
                    </div>
                    <div className='flex justify-end mt-10'>
                        {isEditMode ? (
                            <Button text={`${isLoading ? 'Edit Category....' : 'Submit'}`}
                                disable={isLoading} className='bg-blue-600' type='submit' />
                        ) : (
                            <Button text={`${isLoading ? 'Creating a Category....' : 'Submit'}`}
                                disable={isLoading} className='bg-green-600' type='submit' />
                        )}
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form
