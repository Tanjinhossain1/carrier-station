"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi"; // Import icons
import { FaCartShopping } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import Link from "next/link";

const NavbarHelper = ({ user }: { user: any }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  console.log("user  ", user);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically set the height of the navbar
  useEffect(() => {
    const navbarElement: any = document.getElementById("navbar");
    setNavbarHeight(navbarElement.offsetHeight);
  }, [isScrolled]);

  return (
    <>
      {/* pc device  */}
      <nav
        id="navbar"
        className={`bg-orange-600 hidden md:block text-white fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? "h-16" : "h-32"
        }`}
      >
        {/* Top section with links */}
        <div
          className={`md:max-w-[1200px] mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
            isScrolled ? "h-0 opacity-0" : "h-16 opacity-100"
          }`}
        >
          <div className="flex items-center gap-12 justify-end md:justify-end">
            <a href="#" className="hover:underline hidden md:inline">
              Become a Seller
            </a>
            <a href="#" className="hover:underline hidden md:inline">
              Help & Support
            </a>
            {user?.email ? (
              <>
                <button
                  className="block py-2 hover:underline"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
                <button className="block py-2 hover:underline">
                  <Link href={"/admin"}>Admin</Link>
                </button>
              </>
            ) : (
              <>
                {" "}
                <a href="/login" className="block py-2 hover:underline">
                  Login
                </a>
                <a
                  href="/register"
                  className="hover:underline hidden md:inline"
                >
                  Sign Up
                </a>
              </>
            )}
            <a href="#" className="hover:underline hidden md:inline">
              Home
            </a>
          </div>
        </div>

        {/* Middle section with logo and search bar */}
        <div
          className={`md:max-w-[1000px] ${
            isScrolled ? "mt-2" : ""
          } mx-auto flex    align-left items-center gap-3`}
        >
          <h1 className="hidden md:block items-center text-2xl font-bold">
            Carrier Station
          </h1>

          <div className="flex-1 mx-4 relative ">
            <input
              type="text"
              placeholder="Search Here..."
              className="w-full   text-black px-4 py-3 rounded pl-16"
            />
            <button className="absolute top-0 h-full flex items-center justify-center px-4 focus:outline-none bg-orange-600 hover:bg-orange-500 border border-white rounded-l">
              <FiSearch className="text-gray-500" />
            </button>
          </div>
          <div className="flex">
            {" "}
            <FaCartShopping className="text-3xl" />
            <sup>0</sup>
          </div>
        </div>
      </nav>
      {/* mobile device  */}
      <nav className="bg-orange-600 text-white px-4 py-2 items-center block md:hidden">
        {/* Top section with links */}
        <div className="md:max-w-[1200px] mx-auto">
          <div className="flex items-center gap-12 justify-end md:justify-end">
            <h1 className="md:hidden   focus:outline-none items-right text-2xl font-bold ">
              Carrier Station
            </h1>
            <button
              className="md:hidden   items-center focus:outline-none"
              onClick={toggleDrawer}
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>
          <div className="flex ">
            <div className="flex-1 mx-4 relative ">
              <input
                type="text"
                placeholder="Search Here..."
                className="w-full   text-black px-4 py-3 rounded pl-16"
              />
              <button className="absolute top-0 h-full flex items-center justify-center px-4 focus:outline-none bg-orange-600 hover:bg-orange-500 border border-white rounded-l">
                <FiSearch className="text-gray-500" />
              </button>
            </div>
            <div className="flex mt-3">
              {" "}
              <FaCartShopping className="text-3xl" />
              <sup>0</sup>
            </div>
          </div>
        </div>

        {/* Drawer for mobile menu */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-orange-600 text-white z-50 transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={toggleDrawer}
          >
            <FiX />
          </button>
          <div className="mt-16 px-4">
            <a href="#" className="block py-2 hover:underline">
              Home
            </a>
            <a href="#" className="block py-2 hover:underline">
              Become a Seller
            </a>
            <a href="#" className="block py-2 hover:underline">
              Help & Support
            </a>
            {user?.email ? (
              <>
                <button onClick={() => signOut()}>Log Out</button>
                <button>
                  <Link href={"/admin"}>Admin</Link>
                </button>
              </>
            ) : (
              <>
                {" "}
                <a href="/login" className="block py-2 hover:underline">
                  Login
                </a>
                <a href="#" className="block py-2 hover:underline">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>

        {/* Overlay for drawer */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleDrawer}
          ></div>
        )}
      </nav>
    </>
  );
};

export default NavbarHelper;
