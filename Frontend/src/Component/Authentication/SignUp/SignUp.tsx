import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../User.css";
import axios from "axios";
import api from "../../../Constants/apiRoutes";
import { useState } from "react";
import { Home, Warning } from "../../Elements/Icons";
import validSignUp from "../../../Validations/SignUpValidation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { SignUpValues } from "../../../Types/Interfaces";

function SignUp() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function eyeOn() {
    setIsVisible(true);
  }
  function eyeOff() {
    setIsVisible(false);
  }

  const onSubmit = async (values: SignUpValues) => {
    try {
      await axios.post(api.SignUp, values);
      navigate("/login");
      alert("SignUp Succssefully.Please Login!");
    } catch (error: any) {
      console.log(error);
      
    }
  };
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validSignUp}
        onSubmit={onSubmit}
      >
        <section className="flex flex-col md:flex-row h-screen items-center justify-center drop-shadow-lg my-12 md:my-28">
          <div className="struch">
            <div className="w-full h-100">
              <div className="flex justify-between">
                <p className="text-xl md:text-xl font-bold leading-tight">
                  SignUp
                </p>
                <span className="hidden md:block cursor-pointer rounded-full p-2 hover:bg-gray-100 transition ">
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
              <Form className="mt-4">
                <div className="mt-2">
                  <label htmlFor="userName" className="lable">
                    UserName
                  </label>
                  <Field
                    name="userName"
                    id="userName"
                    placeholder="example12"
                    className="inp"
                  />
                  <ErrorMessage
                    name="userName"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>
                <div className="mt-2">
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

                <div className="mt-2">
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
                <div className="mt-2">
                  <label htmlFor="confirmPassword" className="lable">
                    confirmPassword
                  </label>
                  <Field
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="********"
                    className="inp"
                    type="password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>

                <button type="submit" className="logBtn">SignUp</button>

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
              </Form>
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
          </div>
        </section>
      </Formik>
    </>
  );
}
export default SignUp;