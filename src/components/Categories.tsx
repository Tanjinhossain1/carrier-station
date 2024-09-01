import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Categories() {
  const Data = [
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
    {
      title: "Routers",
      image: "https://img.drz.lazcdn.com/static/bd/p/aacc5599718fa3788f720985aa9c9ad4.jpg_80x80q80.jpg_.webp",
    }, 
  ];
  return (
    <div className="mb-5">
      <h2 className="text-2xl mb-1">Categories</h2>
       
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-8 shadow bg-white">
        {Data?.slice(0,20)?.map((data, index) => {
          return (
           <Link href={'/'} key={index}>
            <div className="p-4 hover:shadow-2xl  border" key={index}>
              <Image
                src={data?.image}
                width={100}
                height={100}
                layout="responsive"
                alt={data?.title}
                className="mb-2"
              />
              <p className="text-sm text-center  font-semibold line-clamp-2 ">
                {data?.title}
              </p>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
