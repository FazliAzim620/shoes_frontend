import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getDiscountPricePercent } from "@/utils/helper";
const ProductCard = ({ data }) => {

  return (
    <Link
      href={`/product/${data?.attributes?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer "
    >
      <Image
        width={500}
        height={400}
        src={data?.attributes?.thumbnail.data.attributes.url}
        alt='product image'
      />
      <div className="text-black text-lg font-medium">{data?.attributes?.name}</div>
      <div className="flex items-center text-black/[0.5]">
        <p className="mr-4 text-lg font-semibold text-black"> $ {data?.attributes?.price}</p>
        <p className="text-base font-medium line-through">
          {data?.attributes?.original_price && `$ ${data?.attributes?.original_price}`}
        </p>
        <p className="ml-auto text-base font-medium text-green-500 ">
          {data?.attributes?.original_price ? `${getDiscountPricePercent(data?.attributes?.original_price, data?.attributes?.price)} % off` :'0% off'} 
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
