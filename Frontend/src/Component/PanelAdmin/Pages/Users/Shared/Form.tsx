import Button from "../../../../Elements/Buttons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import validateUser from "../../../../../Validations/UserValidation";
import apiRoutes from "../../../../../Constants/apiRoutes";
import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import { formattedDate } from "../../Blog/Utilities/Conditions";

interface IUser {
    fullName: string;
    email: string;
    phoneNumber: string
    password: string;
    confirmPassword: string
    role: string
    updatedAt?: Date;
    createdAt?: Date;
}

interface IForm {
    isEditMode: boolean
    initialValues?: Partial<IUser> | null;
    onSubmit: (data: IUser) => void
    isLoading: boolean;
    error: string | null;
}

interface IRoles {
    _id: string
    name: string;
}

interface IAPIRoles {
    status: string;
    data: IRoles[]
}

function Form({ onSubmit, initialValues, isEditMode, isLoading, error }: IForm) {
    const [roles, setRoles] = useState<IRoles[]>([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IUser>({
        resolver: yupResolver(validateUser),
        defaultValues: initialValues || {}
    });
    useEffect(() => {
        if (initialValues) {
            reset(initialValues)
        }
    }, [initialValues, reset]);
    const handleFormSubmit: SubmitHandler<IUser> = (data) => { onSubmit(data) }

    //#region GetRoles
    useEffect(() => {
        getRoles();
    }, [])
    const getRoles = async () => {
        try {
            const response = await fetch(apiRoutes.getRoles);
            const data: IAPIRoles = await response.json();
            setRoles(data.data)
        } catch (error: any) {

        }
    }
    //#endregion 

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='bg-white p-5 rounded-xl flex flex-col gap-5'>
                {error && (<span className="error">{error}</span>)}

                <div className="flex justify-between">
                    <h1 className="font-bold text-3xl uppercase"><span className="underline underline-offset-4">{isEditMode ? "Edit" : "New"}</span> User</h1>

                    {isEditMode && (
                        <div className="bg-slate-100 p-2 rounded-xl relative">
                            <CalendarDateRangeIcon className="w-8 absolute -top-4 -left-4 bg-slate-100 p-1 rounded-full" />
                            <div className="flex flex-col pt-2 gap-2 text-sm">
                                <p className="font-semibold" >UpdatedAt : <span className="text-gray-500">
                                    {initialValues?.updatedAt && (formattedDate(initialValues?.updatedAt))}</span></p>
                                <p className="font-semibold" >CreatedAt : <span className="text-gray-500">
                                    {initialValues?.createdAt && (formattedDate(initialValues?.createdAt))}</span></p>
                            </div>
                        </div>
                    )}

                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <label>FullName</label>
                        <input type="text"  {...register('fullName')} placeholder="Enter full name" />
                        {errors.fullName && <span className="error">{errors.fullName.message}</span>}
                    </div>
                    <div className="flex justify-between gap-5">
                        <div className="w-full">
                            <label>Email</label>
                            <input type="text"
                                {...register('email')} placeholder="Enter Email e.g,. example.gmail.com" />
                            {errors.email && <span className="error">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" {...register('phoneNumber')} placeholder="Enter phone number" />
                            {errors.phoneNumber && <span className="error">{errors.phoneNumber.message}</span>}
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"  {...register('password')} placeholder="Enter password" />
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </div>
                    <div>
                        <label>ConfirmPassword</label>
                        <input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2 border p-2 rounded-xl relative">
                        <label className="absolute -top-3 -left-4 bg-white">Roles</label>
                        <div className="flex">
                            {roles.map((r) => (
                                <div key={r._id} className="m-1 border p-1 rounded-lg flex gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <input type="radio" value={r._id}  {...register('role')} />
                                    <label>{r.name}</label>
                                </div>
                            ))}
                            {errors.role && <span className="error">{errors.role.message}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    {isEditMode ? (
                        <Button text={`${isLoading ? 'Edit User....' : 'Submit'}`}
                            disable={isLoading} className='bg-blue-600' type='submit' />
                    ) : (
                        <Button text={`${isLoading ? 'Creating a User....' : 'Submit'}`}
                            disable={isLoading} className='bg-green-600' type='submit' />
                    )}
                </div>
            </form>
        </>
    )
}

export default Form
