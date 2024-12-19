import "../User.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import validLogin from "../../../Validations/LoginValidation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { ExclamationTriangleIcon, EyeIcon, EyeSlashIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Features/Authentication/AuthSlice/AuthSlice";
import { useLoginMutation } from "../../Features/Authentication/authApiSlice/authApiSlice";
import { useEffect, useRef, useState } from "react";
import Button from "../../Elements/Buttons";
import { useAuth0 } from '@auth0/auth0-react';

interface IUser {
  email: string;
  password: string;
}

const Login = () => {

  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const userRef = useRef<HTMLInputElement>()
  const errRef = useRef<HTMLInputElement>()
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const initialValues = {
    email: "",
    password: "",
  };
  const eyeOff = () => {
    setIsVisible(false)
  }

  const eyeOn = () => {
    setIsVisible(true)
  }

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
    try {
      setIsSubmitting(true);
      const userData = await login(values).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate("/");
    } catch (error: any) {
      
      setErrMsg(error.data.message)
      if (!error) {
        setErrMsg('No Server Response');
      } else if (error.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.status === 401) {
        setErrMsg("Email Or Password is Not Valid!");
      } else {
        setErrMsg("login Failed");
      }
      errRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      {!isAuthenticated && (
        <Formik
          initialValues={initialValues}
          validationSchema={validLogin}
          onSubmit={handleLogin}
        >
          <section className="boxlogin">
            <div className="struch">
              <div className="w-full h-max">
                <div className="justify-between md:flex">
                  <p className="text-xl font-bold leading-tight md:text-xl">
                    Login to your account
                  </p>
                  <Link to="/">
                    <HomeIcon aria-label="Home Page" className="hidden w-10 p-2 transition duration-150 ease-linear rounded-full cursor-pointer md:block hover:bg-gray-100 dark:hover:bg-gray-700" />
                  </Link>
                </div>
                {errMsg && (
                  <span className="flex gap-3 text-lg text-red-500">
                    <ExclamationTriangleIcon className="w-6" />
                    {errMsg}
                  </span>
                )}
                <Form autoComplete="off">
                  <div className="mt-3">
                    <label htmlFor="email" className="lable">
                      Email
                    </label>
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      className="inp"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="email"
                      component={"p"}
                      className="text-red-600"
                    />
                  </div>

                  <div className="mt-3">
                    <label htmlFor="password" className="lable">
                      Password
                    </label>
                    <div className="relative flex justify-end">
                      <div className="absolute py-3 cursor-pointer right-5">
                        {isVisible ? (
                          <EyeSlashIcon onClick={eyeOff} className="w-5 h-6" />
                        ) : (
                          <EyeIcon onClick={eyeOn} className="w-5 h-6" />
                        )}
                      </div>
                      <Field
                        name="password"
                        id="password"
                        type={isVisible ? "password" : "text"}
                        placeholder="********"
                        className="inp"
                        autoComplete="off"
                      />
                    </div>

                    <ErrorMessage
                      name="password"
                      component={"span"}
                      className="text-red-600"
                    />
                  </div>
                  <div className="text-right">
                    <span className="forgetPass"> Forgot Password?</span>
                  </div>

                  <div className="my-5 text-center">
                    <Button text="Login" disable={isSubmitting} className="px-20 bg-orange-400" />
                  </div>
                </Form>

                <hr className="w-full my-6 border-gray-300" />
                {/* Login With Google */}
                <div className="flex gap-3">

                  <button type="button" className="gmailBtn" onClick={handleGoogleLogin}>
                    <div className="flex items-center justify-center gap-2">
                      <p>Login with Google</p>
                      <FaGoogle style={{ fontSize: "1.9rem" }} />
                    </div>
                  </button>

                  {/* Login With GitHub */}
                  <button type="button" className="gitBtn" onClick={handleGitHubLogin}>
                    <div className="flex items-center justify-center gap-2">
                      <p>Login with Github</p>
                      <FaGithub style={{ fontSize: "1.9rem" }} />
                    </div>
                  </button>
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
          </section>
        </Formik>
      )}
    </>
  );
}

export default Login;
