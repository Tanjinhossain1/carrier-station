import Image from "next/image";
import Link from "next/link";
import React from "react";
import SingleProductList from "./SingleProductList";

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
      <SingleProductList productList={Data.slice(0,6)} />
    </div>
  );
}
