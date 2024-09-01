// app/register/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Snackbar from "@/components/Snackbar";
import { signIn } from "next-auth/react";
import axios from "axios";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup.string().oneOf(["buyer", "seller"], "Role is required"),
});

export default function RegisterPage() {
  const [showSnackbar, setShowSnackbar] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "success">("error");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
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
    } catch (error:any) {
        console.log('first error', error);
      setType("error");
      setShowSnackbar(error?.response?.data?.error);
      setTimeout(() => setShowSnackbar(null), 3000);
    }
  };
  const onClose = () => {
    setShowSnackbar(null);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Snackbar
        onClose={onClose}
        message={showSnackbar as string}
        type={type}
        show={showSnackbar ? true : false}
      />
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
              className="mr-2"
            />
            <label>Buy Product (Buyer)</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="seller"
              {...register("role")}
              className="mr-2"
            />
            <label>Sell Product (Seller)</label>
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
  );
}
