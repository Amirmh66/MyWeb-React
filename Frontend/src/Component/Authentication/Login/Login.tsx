import { Link, useNavigate } from "react-router-dom";
import validLogin from "../../../Validations/LoginValidation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Features/Authentication/AuthSlice/AuthSlice";
import { useLoginMutation } from "../../Features/Authentication/authApiSlice/authApiSlice";
import { useEffect, useRef, useState } from "react";
import Button from "../../Elements/Buttons";
import { useAuth0 } from '@auth0/auth0-react';
import { useForm, SubmitHandler } from "react-hook-form";
import "../User.css";
import { yupResolver } from "@hookform/resolvers/yup";

interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validLogin),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleFormSubmit: SubmitHandler<IUser> = (data) => { handleLogin(data) }

  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const userRef = useRef<HTMLInputElement>()
  const errRef = useRef<HTMLInputElement>()
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      }
    })
  }
  const handleGitHubLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'github',
      }
    })
  }
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const handleLogin = async (values: IUser) => {
    setErrMsg(null)
    setIsLoading(true);
    try {
      const userData = await login(values).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate("/");
    } catch (error: any) {

      if (error.status === 404) {
        setErrMsg(error.data.message)
      }

      if (!error) {
        setErrMsg('No Server Response');
      } else if (error.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.status === 401) {
        setErrMsg(error.data.message);
      }
      errRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {!isAuthenticated && (
        <div className="flex justify-center items-center py-10 bg-gray-100">
          <div className="structure">

            <div>

              <div className="justify-between md:flex">
                <p className="text-xl font-bold leading-tight md:text-xl">
                  Login to your account
                </p>
                <Link to="/">
                  <HomeIcon aria-label="Home Page"
                    className="hidden w-10 p-2 transition duration-150 ease-linear rounded-full 
                    cursor-pointer md:block hover:bg-gray-100 dark:hover:bg-gray-700" />
                </Link>
              </div>

              {errMsg && (
                <span className="error">
                  {errMsg}
                </span>
              )}

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-col gap-5">
                  <div>
                    <label>Email</label>
                    <input type="text" {...register('email')} placeholder="Enter your Email" />
                    {errors.email && <span className='error'>{errors.email.message}</span>}
                  </div>

                  <div>
                    <label>Password</label>
                    <input type="password" {...register("password")} placeholder="Enter your password" />
                    {errors.password && <span className='error'>{errors.password.message}</span>}
                  </div>

                </div>
                <div className="text-right">
                  <span className="forgetPass"> Forgot Password?</span>
                </div>

                <div className="mb-5 mt-10 max-w-full">
                  <Button text={isLoading ? "Please Wait..." : "Login"} disable={isLoading} className="bg-orange-400 w-full" />
                </div>
              </form>


              <hr className="w-full my-6 border-gray-300" />
              {/* Login With Google */}
              <div className="flex gap-3">

                <button className="gmailBtn" onClick={handleGoogleLogin}>
                  <div className="flex items-center justify-center gap-1">
                    <p>Login with Google</p>
                    <FaGoogle style={{ fontSize: "1.8rem" }} />
                  </div>
                </button>

                {/* Login With GitHub */}
                <div className="gitBtn" onClick={handleGitHubLogin}>
                  <div className="flex items-center justify-center gap-2">
                    <p>Login with Github</p>
                    <FaGithub style={{ fontSize: "1.8rem" }} />
                  </div>
                </div>
              </div>

              <p className="flex gap-2 mt-7">
                Need an account?{" "}
                <Link to="/signup">
                  <p className="font-semibold text-blue-500 hover:text-blue-700">
                    Create an account
                  </p>
                </Link>
              </p>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Login;
