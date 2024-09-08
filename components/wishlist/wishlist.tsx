"use client";
import { RemoveFromWishlist, FetchWishlist } from "@/service/wishlist.service";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import image from "@/public/images/auth/sky.png";
import Image from "next/image";

interface Product {
  id: number;
  uuid: string;
  product: {
    uuid: string;
    title: string;
    price: string;
    compare_at_price: string;
    slug: string;
    description: string;
    images: any;
  };
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishList] = useState<Product[]>([]);

  useEffect(() => {
    if (wishlist.length == 0) {
      fetchWishlistData();
    }
  }, []);

  //Function to fetch wishlist product
  const fetchWishlistData = async () => {
    try {
      const response = await FetchWishlist();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
        return;
      }
      setWishList(response?.data?.result);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  //Function to fetch wishlist
  const RemoveProductFromWishlist = async (uuid: string) => {
    try {
      const response = await RemoveFromWishlist(uuid);
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
        return;
      }
      fetchWishlistData();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="max-w-xxl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">
        My Wishlist ({wishlist?.length})
      </h1>
      <div className="space-y-4">
        {wishlist?.length > 0 &&
          wishlist?.map((product) => (
            <div
              key={product.uuid}
              className="flex items-start justify-between p-4 bg-white shadow-md rounded-md"
            >
              <Image
                src={image}
                alt="Picture of the product"
                className="w-20 h-20 object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {product?.product?.title}
                </h2>
                <div className="mt-2">
                  <span className="text-xl font-bold">
                    ₹{product?.product?.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{product?.product?.compare_at_price}
                  </span>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-red-600"
                onClick={() => RemoveProductFromWishlist(product.uuid)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
