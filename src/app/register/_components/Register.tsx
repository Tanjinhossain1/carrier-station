// app/register/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Snackbar from "@/components/Snackbar";
import { signIn } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup.string().oneOf(["buyer", "seller"], "Role is required"),
});

export default function Register() {
  const [showSnackbar, setShowSnackbar] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "success">("error");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "buyer", // Set the default role to "buyer"
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/register", data);
      setType("success");
      setShowSnackbar("Successfully registered");
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResponse?.error) {
        setType("error");
        setShowSnackbar("Registration failed. Please try again.");
        setTimeout(() => setShowSnackbar(null), 3000);
      } else {
        setType("success");
        setShowSnackbar("Successfully Login");
        window.location.href = "/";
      }
    } catch (error: any) {
      console.log("first error", error);
      setType("error");
      setShowSnackbar(error?.response?.data?.error);
      setTimeout(() => setShowSnackbar(null), 3000);
    }
  };
  const onClose = () => {
    setShowSnackbar(null);
  };
  const selectedRole = watch("role");
  return (
    <div className="flex flex-col   mt-16  justify-center min-h-screen ">
      <Snackbar
        onClose={onClose}
        message={showSnackbar as string}
        type={type}
        show={showSnackbar ? true : false}
      />
      <div className="bg-orange-600 text-white flex items-center justify-center md:gap-20 w-full md:p-20 md:mt-4">
        <div className="w-[500px] hidden md:block">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            {selectedRole === "buyer"
              ? "Become A Buyer Today!"
              : "Become A Seller Today!"}
          </h1>
          <p className="text-md md:text-lg md:mb-6 text-center md:text-left">
            {selectedRole === "buyer"
              ? "Join our platform to find the best deals and products!"
              : "Create a seller account now and reach millions of customers!"}
          </p>
          <Image
            width={500}
            height={500}
            src="/shoping-login.png"
            alt="Cart Illustration"
            className="w-full max-w-xs md:max-w-md hidden md:block"
          />
        </div>
        <form
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold mb-4">Register</h1>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              {...register("fullName")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-red-500">{errors.fullName?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <div className="flex items-center">
              <input
                type="radio"
                value="buyer"
                {...register("role")}
                className="mr-2 text-black"
              />
              <label className="text-black">Buy Product (Buyer)</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="seller"
                {...register("role")}
                className="mr-2 text-black"
              />
              <label className="text-black">Sell Product (Seller)</label>
            </div>
            <p className="text-red-500">{errors.role?.message}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
      <div className="md:max-w-[1200px] mt-12 mb-12 mx-auto">
        <div className="text-left">
          <h1 className="text-5xl">Why Sell on Carrier Station?</h1>
        </div>
        <div>
          <div className="grid  grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3  mt-4">
            <div className="flex align-top">
              <div className="mr-4 mt-1  ">
                <Image
                  src={"/download (5).jpeg"}
                  width={50}
                  height={50}
                  // layout="responsive"
                  alt={"Reach"}
                  className="mb-2"
                />
              </div>
              <div>
                <p className="text-lg   font-semibold line-clamp-2 ">Reach</p>
                <p className="text-orange-500 text-xs font-medium mt-1">
                  Millions of customers on Carrier station, most visited
                  shopping destination
                </p>
              </div>
            </div>
            <div className="flex align-top">
              <div className="mr-4 mt-1  ">
                <Image
                  src={"/download (6).jpeg"}
                  width={50}
                  height={50}
                  alt={"Reach"}
                  className="mb-2"
                />
              </div>
              <div>
                <p className="text-lg   font-semibold line-clamp-2 ">
                  Free Registration
                </p>
                <p className="text-orange-500 text-xs font-medium mt-1">
                  Account registration & listing items for sale is free
                </p>
              </div>
            </div>
            <div className="flex align-top">
              <div className="mr-4 mt-1  ">
                <Image
                  src={"/download (8).jpeg"}
                  width={50}
                  height={50}
                  alt={"Reach"}
                  className="mb-2"
                />
              </div>
              <div>
                <p className="text-lg   font-semibold line-clamp-2 ">
                  Reliable Shipping
                </p>
                <p className="text-orange-500 text-xs font-medium mt-1">
                  Fast, reliable and hassle free delivery through Daraz logistic
                  network
                </p>
              </div>
            </div>
            <div className="flex align-top">
              <div className="mr-4 mt-1  ">
                <Image
                  src={"/download (9).jpeg"}
                  width={50}
                  height={50}
                  alt={"Reach"}
                  className="mb-2"
                />
              </div>
              <div>
                <p className="text-lg   font-semibold line-clamp-2 ">
                  Timely Payments
                </p>
                <p className="text-orange-500 text-xs font-medium mt-1">
                  Funds are safely deposited directly to your bank account on a
                  weekly basis
                </p>
              </div>
            </div>
            <div className="flex align-top">
              <div className="mr-4 mt-1  ">
                <Image
                  src={"/download (10).jpeg"}
                  width={50}
                  height={50}
                  alt={"Reach"}
                  className="mb-2"
                />
              </div>
              <div>
                <p className="text-lg   font-semibold line-clamp-2 ">
                  Marketing Tools
                </p>
                <p className="text-orange-500 text-xs font-medium mt-1">
                  Find new customers & grow more with advertising and our whole
                  range of marketing tools
                </p>
              </div>
            </div>
            <div className="flex align-top">
              <div className="mr-4 mt-1  ">
                <Image
                  src={"/download (11).jpeg"}
                  width={50}
                  height={50}
                  alt={"Reach"}
                  className="mb-2"
                />
              </div>
              <div>
                <p className="text-lg   font-semibold line-clamp-2 ">
                  Support&Training
                </p>
                <p className="text-orange-500 text-xs font-medium mt-1">
                  Learn all about ecommerce for free and get help with seller
                  support and Daraz University
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
