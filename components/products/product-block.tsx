import React from 'react';
import { Card } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';
import CarImage from "@/public/images/all-img/car11.png";
import { Icon } from '@iconify/react';
import { Button } from '../ui/button';

interface IProductBlockProps{
    products:any
}

const ProductBlock:React.FC<IProductBlockProps> = ({products}) => {
    return(
        products && products.map((product: any) => (
            <Card key={product?.id || product?.slug} className="p-4 rounded-md">
                <Link href={`/products/${product?.slug}`}>
                    <div className="relative h-[191px] flex flex-col justify-center items-center mb-3 rounded-md">
                        <div className="w-full overflow-hidden rounded-md relative z-10 bg-default-100 dark:bg-default-200 h-full group">
                            <Image
                                alt={product?.title || 'Product image'}
                                className="h-full w-full object-contain p-6 transition-all duration-300 group-hover:scale-105"
                                src={CarImage}
                            />
                            <div className="hover-box flex flex-col invisible absolute top-3 ltr:right-2 rtl:left-2 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 space-y-[6px]">
                                <>
                                    <button className="rounded-full bg-background p-2">
                                        <Icon
                                            icon="ph:heart-fill"
                                            className="text-muted-foreground hover:text-destructive h-4 w-4"
                                        />
                                    </button>
                                    <button className="rounded-full bg-background p-2">
                                        <Icon
                                            icon="ph:eye"
                                            className="text-muted-foreground hover:text-destructive h-4 w-4"
                                        />
                                    </button>
                                    <button className="rounded-full bg-background p-2">
                                        <Icon
                                            icon="jam:refresh-reverse"
                                            className="text-muted-foreground hover:text-destructive h-4 w-4"
                                        />
                                    </button>
                                </>
                            </div>
                        </div>
                    </div>
                </Link>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-secondary-foreground uppercase font-normal">
                            {product?.brand?.brand_name}
                        </p>
                        <span className="flex items-center text-secondary-foreground font-normal text-xs gap-x-1">
                            <Icon icon="ph:star-fill" className="text-yellow-400" />
                            <span>4.8</span>
                        </span>
                    </div>
                    <h6 className="text-secondary-foreground text-base font-medium mb-[6px] truncate">
                        <Link href={`/products/${product?.slug}`}>
                            {product?.title}
                        </Link>
                    </h6>
                    <p className="text-default-500 text-sm font-normal mb-2">
                        {product?.description && product.description.length > 55
                            ? product.description.slice(0, 55) + '...'
                            : product?.description}
                    </p>
                    <p className="mb-4 space-x-4">
                        <span className="text-primary text-base font-bold mt-2">
                            ${product?.price}
                        </span>
                        <del className="text-default-500 font-normal text-base">
                            ${product?.compare_at_price}
                        </del>
                    </p>
                    <Button className="w-full font-light">
                        Request Quote
                    </Button>
                </div>
            </Card>
        ))
    )
}

export default ProductBlock;