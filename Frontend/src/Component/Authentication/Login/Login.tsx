import "../User.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import validLogin from "../../../Validations/LoginValidation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { ExclamationTriangleIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Features/Authentication/AuthSlice/AuthSlice";
import { useLoginMutation } from "../../Features/Authentication/authApiSlice/authApiSlice";
import { useEffect, useRef, useState } from "react";

interface IUser {
  email: string;
  password: string;
}
function Login() {

  const userRef = useRef<HTMLInputElement>()
  const errRef = useRef<HTMLInputElement>()
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);


  const handleLogin = async (values: IUser) => {
    try {
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
    }
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validLogin}
        onSubmit={handleLogin}
      >
        <section className="boxlogin">
          <div className="struch">
            <div className="w-full h-max">
              <div className="md:flex justify-between">
                <p className="text-xl md:text-xl font-bold leading-tight">
                  Login to your account
                </p>
                <Link to="/">
                  <HomeIcon aria-label="Home Page" className="hidden md:block w-10 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                  duration-150 transition ease-linear" />
                </Link>
              </div>
              {errMsg && (
                <span className="text-lg text-red-500 flex gap-3">
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
                  <div className="relative flex justify-center items-center">
                    {/* <div className="absolute cursor-pointer p-2 right-2 top-3">
                      {isVisible ? (
                        <EyeSlashIcon onClick={eyeOff} className="w-5 h-6" />
                      ) : (
                        <EyeIcon onClick={eyeOn} className="w-5 h-6" />
                      )}
                    </div> */}
                    <Field
                      name="password"
                      id="password"
                      type="password"
                      placeholder="********"
                      className="inp"
                      autoComplete="off"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>

                <div className="text-right mt-2">
                  <p className="forgetPass"> Forgot Password?</p>
                </div>

                <button type="submit" className="logBtn">
                  LogIn
                </button>
              </Form>

              <hr className="my-6 border-gray-300 w-full" />
              <div className="flex gap-3">
                <button type="button" className="gmailBtn">
                  <div className="flex items-center justify-center gap-2">
                    <p>Login with Google</p>
                    <FaGoogle style={{ fontSize: "1.9rem" }} />
                  </div>
                </button>

                <button type="button" className="gitBtn">
                  <div className="flex items-center justify-center gap-2">
                    <p>Login with Github</p>
                    <FaGithub style={{ fontSize: "1.9rem" }} />
                  </div>
                </button>
              </div>

              <p className="mt-7 flex gap-2">
                Need an account?{" "}
                <Link to="/signup">
                  <p className="text-blue-500 hover:text-blue-700 font-semibold">
                    Create an account
                  </p>
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Formik>
    </>
  );
}

export default Login;
