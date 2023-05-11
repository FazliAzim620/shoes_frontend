import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import {  useState } from "react";
export default function Home({data}) {

  return (
    <>
    
      <main className="  ">
     <HeroBanner/>
     <Wrapper>
      <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px] capitalize">
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Cushioning for your miles </div>
        <div className="text-md md:text-xl">A lightweight Nize ZoomX midsole is combined with increased stack heights to help provide cushioning during extended stretches of running.</div>
      </div>
      <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-14 px-5 md:px-0'>
        {data?.data?.map((data)=>{
        return <ProductCard key={data?.id} data={data}/>})}
      </div>
     </Wrapper>
      </main>
    </>
  );
}
export async function getStaticProps(){
  const endpoint = "/api/products?populate=*";
    const data = await fetchDataFromApi(endpoint);
return{
props:{data}
}
}