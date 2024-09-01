import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FlashSale() {
  const Data = [
    {
      image:
        "https://img.drz.lazcdn.com/static/bd/p/0bf06e7284cb609585f74962d06bd5ee.jpg_200x200q80.jpg_.webp",
      title: "Flash Sale Product 1",
      price: 299,
      description: "This is a flash sale product",
      discount: 18,
    },
    {
      image:
        "https://img.drz.lazcdn.com/static/bd/p/0bf06e7284cb609585f74962d06bd5ee.jpg_200x200q80.jpg_.webp",
      title: "Flash Sale Product 1",
      price: 299,
      description: "This is a flash sale product",
      discount: 18,
    },
    {
      image:
        "https://img.drz.lazcdn.com/static/bd/p/0bf06e7284cb609585f74962d06bd5ee.jpg_200x200q80.jpg_.webp",
      title: "Flash Sale Product 1",
      price: 299,
      description: "This is a flash sale product",
      discount: 18,
    },
    {
      image:
        "https://img.drz.lazcdn.com/static/bd/p/0bf06e7284cb609585f74962d06bd5ee.jpg_200x200q80.jpg_.webp",
      title: "Flash Sale Product 1",
      price: 299,
      description: "This is a flash sale product",
      discount: 18,
    },
    {
      image:
        "https://img.drz.lazcdn.com/static/bd/p/0bf06e7284cb609585f74962d06bd5ee.jpg_200x200q80.jpg_.webp",
      title: "Flash Sale Product 1",
      price: 299,
      description: "This is a flash sale product",
      discount: 18,
    },
    {
      image:
        "https://img.drz.lazcdn.com/static/bd/p/0bf06e7284cb609585f74962d06bd5ee.jpg_200x200q80.jpg_.webp",
      title: "Flash Sale Product 1 Flash Sale Product 1 Flash Sale Product 1",
      price: 299,
      description: "This is a flash sale product ",
      discount: 18,
    }, 
  ];
  return (
    <div className="mb-5">
      <h2 className="text-2xl mb-1">Flash Sale</h2>
      <div className="flex justify-between shadow bg-white px-2 py-4 align-middle items-center border-b">
        <p className="text-orange-600">On Sale Now</p>
        <Link href={"/shop-all-products"}>
          <button className="p-1 text-orange-600 border border-orange-600 rounded">
            Shop All Products
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 shadow bg-white">
        {Data?.slice(0,6)?.map((data, index) => {
          return (
            <div className="p-4 hover:shadow-xl mt-1 hover:border" key={index}>
              <Image
                src={data?.image}
                width={100}
                height={100}
                layout="responsive"
                alt={data?.title}
                className="mb-2"
              />
              <p className="text-sm   font-semibold line-clamp-2 ">
                {data?.title}
              </p>
              <p className="text-orange-500 font-medium">${data?.price}</p>
              <del className="text-gray-500">
                ${data?.price - (data?.price % data?.discount)}
              </del>
              <span className="ml-1 text-green-600">-{data?.discount}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
