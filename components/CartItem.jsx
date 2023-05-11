import {  UPDATE_CART,DELETE_CART_ITEM } from "@/store/cartSlice";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
const CartItem = ({data}) => {
  const dispatch = useDispatch()

const updateCartFunc=(key,e)=>{
dispatch(UPDATE_CART({key,val:data,size:e}))
}
const url=data?.attributes?.image?.data?.[0]?.attributes?.url;
  return (
    <div className="flex py-5 gap-3 md:gap-5 border px-1 text-base cursor-pointer-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px] ">
       <Image width="150" height="150" src={url} alt={data?.attributes?.Name?data?.attributes?.Name:'Product Image'}/>
      </div>
      <div className="w-full flex flex-col ">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
       {data?.attributes?.Name}
          </div>
          <div className="text-sm md:text-md  font-medium text-black/[0.5] block md:hidden ">
          {data?.attributes?.subtitle}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
          MRP: $    {data?.attributes?.price}
        </div>
        </div>

      
        {/* product subtitle start  */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          Men's Running shoes
        </div>
        {/* product subtitle end  */}
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                <div className="flex items-center gap-1">
                    <div className="font-semibold"> Size:</div>
                    <select className="hover:text-black" onChange={(e)=>updateCartFunc('size',e.target.value)}>
                       {data?.attributes?.size?.data?.map((size,i)=>{
                       return<option key={i} value={size?.size} disabled={size?.enabled?false:true} selected={data?.selectedSize==size?.size}>{size?.size} </option>
                       })}
                    </select>
                    <div className="font-semibold ml-4"> Quantity:</div>
                    <div className="flex w-20 ">
                      <p className="mx-1 border px-1 text-base  cursor-pointer" onClick={()=>updateCartFunc('increase')}>+</p>
                      {/* <input className="text-black px-1 text-lg cursor-pointer w-6" value={data?.quantity}/> */}
                      <p className="text-black px-1 text-lg cursor-pointer w-6">{data?.quantity}</p>
                      <p className="mx-1 border px-1 text-base cursor-pointer" onClick={()=>updateCartFunc('decrease')}>-</p>
                    </div>
                </div>
            </div>
            <RiDeleteBin6Line onClick={()=>dispatch(DELETE_CART_ITEM({id:data?.id}))} className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"/>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
