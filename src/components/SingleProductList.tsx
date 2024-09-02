
import Image from 'next/image';
import React from 'react'

export default function SingleProductList({productList}:{productList:any[]}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 shadow bg-white">
    {productList?.map((data:any, index:number) => {
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
  )
}
