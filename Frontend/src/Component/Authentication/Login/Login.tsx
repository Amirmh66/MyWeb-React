import "../User.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import validLogin from "../../../Validations/LoginValidation";
import { useState } from "react";
import axios from "axios";
import api from "../../../Constants/apiRoutes";
import { Home, Warning } from "../../Elements/Icons";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/20/solid";
import { LoginValues } from "../../../Types/Interfaces";

function Login() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const redirect = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  function eyeOn() {
    setIsVisible(true);
  }
  function eyeOff() {
    setIsVisible(false);
  }

  const onSubmit = async (user: LoginValues) => {
    try {
      const res = await axios.post(api.Login, user);
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
      alert("Login Successfully");
      redirect("/");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validLogin}
        onSubmit={onSubmit}
      >
        <section className="boxlogin">
          <div className="struch">
            <div className="w-full h-max">
              <div className="md:flex justify-between">
                <p className="text-xl md:text-xl font-bold leading-tight">
                  Login to your account
                </p>
                <span className="hidden md:block cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition ">
                  <Link to="/">
                    <Home />
                  </Link>
                </span>
              </div>
              {error && (
                <p className="error">
                  <Warning />
                  {error}
                </p>
              )}
              <Form>
                <div className="mt-3">
                  <label htmlFor="email" className="lable">
                    Email
                  </label>
                  <Field
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    className="inp"
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
                    <div className="absolute cursor-pointer p-2 right-2 top-3">
                      {isVisible ? (
                        <EyeSlashIcon onClick={eyeOff} className="w-5 h-6" />
                      ) : (
                        <EyeIcon onClick={eyeOn} className="w-5 h-6" />
                      )}
                    </div>
                    <Field
                      name="password"
                      id="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="********"
                      className="inp"
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
