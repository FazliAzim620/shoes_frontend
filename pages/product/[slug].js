import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProduct from "@/components/RelatedProduct";
import Wrapper from "@/components/Wrapper";
import { addToCart } from "@/store/cartSlice";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountPricePercent } from "@/utils/helper";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const p = product?.data?.[0]?.attributes;
  const cartItem = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const addCart = () => {

    if (!selectedSize) {
      setShowError(true);
      document
        .getElementById("sizeGrid")
        .scrollIntoView({ block: "center", behavior: "smooth" });
    } else {
      dispatch(
        addToCart({
          ...product?.data?.[0],
          selectedSize,
          oneQuantityPrice: p?.price,
        })
      );
      notify();
    }
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] ">
          {/* left column start */}

          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel image={p?.image?.data} />
          </div>
          {/* left column end */}
          {/* right column start */}

          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold mb-2"> {p?.name}</div>
            <div className="text-lg font-semibold mb-5">{p?.subtitle}</div>
            <div className="text-lg font-semibold flex  ">
              MRP: $ {p?.price}
              {p.original_price && (
                <>
                  <p className="text-base  font-medium line-through ml-3">
                    ${p.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountPricePercent(p.original_price, p.price)}% off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl.of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-10">{`(Also includes all aplicable duties)`}</div>

            {/* product sizing start */}
            <div className="mb-10">
              <div className="flex justify-between">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              <div id="sizeGrid" className="grid grid-cols-3 gap-2">
                {p?.size?.data?.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item?.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item?.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item?.size);
                      setShowError(false);
                    }}
                  >
                    {item?.size}
                  </div>
                ))}
              </div>
              {showError && (
                <div className="text-red-500 mt-1">
                  Size selection is requried
                </div>
              )}
            </div>
            <button
              onClick={addCart}
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
            >
              Add to Cart
            </button>
            <button className="w-full py-4 rounded-full border border-black flex items-center justify-center gap-2 text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
              Whishlist
            </button>
            <div>
              <div className="text-lg font-bold mb-10">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{p?.description}</ReactMarkdown>
              </div>
            </div>
            {/* product sizing end */}
          </div>
          {/* right column end */}
        </div>
        <RelatedProduct products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
