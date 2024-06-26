"use client";
import Image from "next/image";
import CheckPinCode from "@/app/components/CheckPinCode";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/confiq/apiurl";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, buyNow, setIsServiceable } from "@/app/redux/cartSlice";
import { toast } from "react-toastify";
import ProductSkeleton from "@/app/components/skeletons/ProductSkeleton";

export const dynamic = 'force-dynamic';

export default function Product({ params }) {
  const dispatch = useDispatch();
  const isServiceable = useSelector((data) => data.cartData.isServiceable)
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [sizeColorVarient, setSizeColorVarient] = useState({});
  const [loading, setLoading] = useState(true);

  const geData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/getproduct/${params.item}`);
      const response = await res.json();
      if (response.success) {
        setProduct(response.varient);
        setSizeColorVarient(response.sizeColorVarient);
      }
    } catch (error) {
      console.error("Server Error!", error);
    }
    setLoading(false);
  };

  const handleOnClick = (color) => {
    setProduct({ ...product, color });
  };

  const handleOnChange = (size) => {
    setProduct({ ...product, size });
    const newColor = Object.keys(sizeColorVarient[size])[0];
    router.push(`/products/product/${sizeColorVarient[size][newColor]}`);
  };

  const handleOnAddToCart = () => {
    toast.success('item added to cart');
    dispatch(
      addToCart({
        id: product._id,
        slug: product.slug,
        name: product.title,
        price: product.price,
        quantity: 1,
        color: product.color,
        size: product.size,
      })
    );
  };

  const handleOnCheckOut = () => {
    dispatch(
      buyNow({
        id: product._id,
        slug: product.slug,
        name: product.title,
        price: product.price,
        quantity: 1,
        color: product.color,
        size: product.size,
      })
    );
    router.push("/checkout");
  };

  useEffect(() => {
    geData();
    dispatch(setIsServiceable(null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="text-gray-600 body-font">
      {loading ? <ProductSkeleton /> :
        <div className="container px-5 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full h-auto object-top rounded">
              <Image
                alt={params.item}
                className="lg:w-1/2 w-full lg:h-auto  object-top rounded h-[80%]"
                src={product.img || ""}
                width={400}
                height={400}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{`${product.title} (${product.size}/${product.color})`}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {[...Array(product.review)].map((_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-pink-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-3">
                    {product.review} Reviews
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {sizeColorVarient[product.size] &&
                    Object.keys(sizeColorVarient[product.size]).sort().map((color) => (
                      <button
                        onClick={() => handleOnClick(color)}
                        key={color}
                        className={`border-2 ${product.color === color
                          ? "border-gray-600"
                          : "border-gray-300"
                          } mr-1 ${color !== "black" ? `bg-${color}-600` : "bg-black"
                          } rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={product.size}
                      onChange={(e) => handleOnChange(e.target.value)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(sizeColorVarient).sort().map((size) => (
                        <option key={size}>{size}</option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button
                  onClick={handleOnAddToCart}
                  disabled={!isServiceable}
                  className="flex ml-auto text-white bg-pink-500 disabled:bg-pink-400 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleOnCheckOut}
                  disabled={!isServiceable}
                  className="flex ml-auto text-white bg-pink-500 disabled:bg-pink-400 border-0 py-1 px-4 md:py-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Order Now
                </button>
                <button className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <CheckPinCode />
            </div>
          </div>
        </div>
      }
    </div>
  );
}
