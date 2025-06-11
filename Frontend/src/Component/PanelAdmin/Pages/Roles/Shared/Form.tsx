import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../../Elements/Buttons"
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import roleValidation from "../../../../../Validations/RoleValidation";
import { CalendarDateRangeIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { formattedDate } from "../../Blog/Utilities/Conditions";

interface IRole {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IForm {
  isEditMode: boolean
  initialValues?: Partial<IRole> | null;
  onSubmit: (data: IRole) => void
  isLoading: boolean;
  error: string | null;
}

function Form({ onSubmit, initialValues, isEditMode, isLoading, error }: IForm) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IRole>({
    resolver: yupResolver(roleValidation),
    defaultValues: initialValues || {}
  })
  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset]);

  const handleFormSubmit: SubmitHandler<IRole> = (data) => { onSubmit(data) }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='bg-white p-5 rounded-xl flex flex-col gap-3'>
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl">
            <span className="underline underline-offset-4">{isEditMode ? "Edit" : "New"}</span> Role</h1>
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
        {error && (
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-5 text-red-500" />
            <span className="error">{error}</span>
          </div>
        )}
        <div>
          <label>Name</label>
          <input type="text" className="lowercase" placeholder="Enter role name..." {...register('name')} />
          {errors.name && <span className='error'>{errors.name.message}</span>}
        </div>
        <div className='flex justify-end mt-10'>
          {isEditMode ? (
            <Button text={`${isLoading ? 'Edit Role....' : 'Submit'}`}
              disable={isLoading} className='bg-blue-600' type='submit' />
          ) : (
            <Button text={`${isLoading ? 'Creating a Role....' : 'Submit'}`}
              disable={isLoading} className='bg-green-600' type='submit' />
          )}
        </div>
      </form>
    </>
  )
}

export default Form
