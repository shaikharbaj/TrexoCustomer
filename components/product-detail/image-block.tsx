import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import productImage from "@/public/images/all-img/i20.png";
import productThumb from "@/public/images/all-img/car1.png";
import Link from 'next/link';

interface IImageProps{}

const ImageBlock:React.FC<IImageProps> = () => {
    return(
        <div className="md:col-span-5">
                <Card className="bg-gray-100 dark:bg-white/10 p-6">
                    <div className="">
                        <Image
                            alt=""
                            className=" h-full w-full object-contain p-6 transition-all duration-300 group-hover:scale-105"
                            src={productImage}
                        />
                    </div>
                    <div className="flex items-start justify-start gap-2">
                        <div className="w-24 h-24 p-2 bg-gray-200 dark:bg-white/10 rounded-md flex items-center">
                            <Image
                                alt=""
                                className=" w-28 transition-all duration-300 group-hover:scale-105"
                                src={productThumb}
                            />
                        </div>
                        <div className="w-24 h-24 p-2 bg-gray-200 dark:bg-white/10 rounded-md flex items-center">
                            <Image
                                alt=""
                                className=" w-28 transition-all duration-300 group-hover:scale-105"
                                src={productThumb}
                            />
                        </div>
                        <div className="w-24 h-24 p-2 bg-gray-200 dark:bg-white/10 rounded-md flex items-center">
                            <Image
                                alt=""
                                className=" w-28 transition-all duration-300 group-hover:scale-105"
                                src={productThumb}
                            />
                        </div>
                        <div className="w-24 h-24 p-2 bg-gray-200 dark:bg-white/10 rounded-md flex items-center">
                            <Image
                                alt=""
                                className=" w-28 transition-all duration-300 group-hover:scale-105"
                                src={productThumb}
                            />
                        </div>
                        <div className=" h-24 p-2 bg-gray-200 dark:bg-white/10 rounded-md flex items-center">
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
    )
}

export default ImageBlock;