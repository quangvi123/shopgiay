import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoginMutation } from "../redux/createAPI";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../redux/slice/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    let dataLogin = await login(data);
    console.log('data login', dataLogin.data);
    
    if(dataLogin.data.status == 200) {
      const { accessToken, refreshToken, role, username, email, id } = dataLogin.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // localStorage.setItem("role", role);
  
      const userInfo = { role, username, email, id };  
      dispatch(setUser({ ...userInfo })); 

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login is successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (dataLogin.data.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      });
    } else {
      console.error("Login failed:");
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text:  dataLogin.data.message || "Đăng nhập không thành công!",
      });
    }
  }

  return (
    <div className="font-[sans-serif] bg-white flex items-center justify-center md:h-screen p-4">
      <div className="max-md:max-w-lg rounded-md p-6">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1 lg:min-w-[450px]">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:w-11/12 w-full object-cover"
              alt="login-image"
            />
          </div>

          <form
            className="md:max-w-md w-full mx-auto"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-blue-600">Sign in</h3>
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  name="email"
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
              {errors.email?.type === "required" && (
                <small className="text-red-500">This email is required</small>
              )}
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="password"
                  {...register("password", { required: true, maxLength: 20 })}
                  type="password"
                  className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              {errors.password?.type === "required" && (
                <small className="text-red-500">
                  This password is required
                </small>
              )}
              {errors.password?.type === "maxLength" && (
                <small className="text-red-500">
                  Password must be less than 10 characters
                </small>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href=""
                  className="text-blue-600 font-semibold text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign in
              </button>
              <p className="text-gray-800 text-sm text-center mt-6">
                Don't have an account{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
