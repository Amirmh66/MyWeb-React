import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import validSignUp from "../../../Validations/SignUpValidation";
import { ISignUp } from "../../../Types/Interfaces";
import Button from "../../Elements/Buttons";
import apiRoutes from "../../../Constants/apiRoutes";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import '../User.css'

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUp>({
    resolver: yupResolver(validSignUp),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit: SubmitHandler<ISignUp> = (data) => { onSubmit(data) }

  //#region Send To server
  const onSubmit = async (values: ISignUp) => {
    setIsLoading(true);
    try {
      await fetch(apiRoutes.SignUp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }).then((res) => {
        if (res.ok) {
          alert("SignUp Succssefully. Please Login!");
          navigate("/login");
        } else if (res.status === 500) {
          setError("Internal Error!")
        }
      })
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };
  //#endregion

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col md:flex-row h-screen items-center justify-center md:drop-shadow-lg my-0 lg:my-12 xl:my-16">
        <div className="structure">

          <p className="text-xl md:text-xl font-bold leading-tight">
            SignUp
          </p>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <div>
            <div className="flex flex-col gap-5 mt-10">

              <div>
                <label>Email</label>
                <input type="email" {...register('email')} placeholder="e.g., yourname@example.com" />
                {errors.email && <span className='error'>{errors.email.message}</span>}
              </div>

              <div>
                <label>Password</label>
                <input type="password" {...register('password')} placeholder="Create a strong password" />
                {errors.password && <span className='error'>{errors.password.message}</span>}
              </div>

              <div>
                <label>confirmPassword</label>
                <input type="password" {...register('confirmPassword')} placeholder="Enter confirmPassword" />
                {errors.confirmPassword && <span className='error'>{errors.confirmPassword.message}</span>}
              </div>

            </div>

            <div className="mt-10 mb-5 max-w-full text-center">
              <Button text={isLoading ? "Please Wait..." : "SignUp"} disable={isLoading} className="bg-orange-400 w-full" />
            </div>

            <div className="text-center mt-6">
              <p>
                Your signup on the website constitiutes acceptance of the{" "}
                <Link to={"/terms"}>
                  <span className="hover:text-blue-500 text-blue-700 font-semibold">
                    terms and conditions.
                  </span>
                </Link>
              </p>
            </div>

          </div>
          <hr className="my-3 border-gray-300 w-full" />
          <p className="mt-7 flex gap-2">
            Do you have account?{" "}
            <Link to="/login">
              <p className="text-blue-500 hover:text-blue-700 font-semibold">
                Login
              </p>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
export default SignUp;
