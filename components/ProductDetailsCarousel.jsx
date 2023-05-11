import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const ProductDetailsCarousel = ({image}) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px] ">
      <Carousel
        infiniteLoop={true}
        showArrows={false}
        showIndicators={false}
        thumbWidth={60}
        className="productCarousel"
      >
       {image?.map((img,i)=>(
                <img key={i} src={img?.attributes?.url} alt={img?.attributes?.name}/>
        ))}

      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
