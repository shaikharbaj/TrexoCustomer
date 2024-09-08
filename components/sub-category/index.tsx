'use client';
import React, { useEffect, useState } from 'react';
import { PageHead } from '../partials/public-header';
import LayoutLoader from '../layout-loader';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { fetchProductBySubCategorySlug } from '@/service/product.service';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { useThemeStore } from '@/store';
import Image from 'next/image';
import { Button } from '../ui/button';
import CarImage from "@/public/images/all-img/car11.png";
import { Card } from '../ui/card';
import { Icon } from '@iconify/react';

interface ISubCategoryListProps {
    props: any;
}

const SubCategoryList: React.FC<ISubCategoryListProps> = ({ props }) => {
    const { isRtl } = useThemeStore();
    const slug = props.params.sub_category;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [pageTitle, setPageTitle] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, [slug])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response: any = await fetchProductBySubCategorySlug(slug);
            if (response?.status === true && response?.statusCode === 200) {
                setPageTitle(response?.data?.category)
                setProducts(response?.data?.products);
                setBrands(response?.data?.brands);
            } else {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
            console.error('Error fetching category:', error);
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <>
            {isLoading ? <LayoutLoader /> :
                <>
                    <PageHead title={'Category: ' + pageTitle} />
                    <section className="mx-10 my-10 bg-white rounded-md p-6">
                        <h2 className="text-slate-800 text-xl font-semibold mb-7">Top Brands of Solar Inverter ({brands.length})</h2>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                direction: isRtl ? "rtl" : "ltr",
                            }}
                            className=""
                        >
                            <CarouselContent>
                                {brands && brands.map((brand, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                                        <div className="p-6 rounded-sm duration-200 text-center">
                                            <div className="mb-4">
                                                <Image
                                                    className="rounded-sm"
                                                    src={CarImage}
                                                    alt="image"
                                                />
                                            </div>
                                            <div className="text-center space-y-1 my-2">
                                                <Link href={`${slug}/${brand?.slug}`} className="font-medium text-gray-800 hover:text-blue-600 text-sm">{brand?.brand_name}</Link>
                                                <p className="font-normal text-gray-600 text-sm">{pageTitle}</p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </section>
                    <section className="py-10 px-20">
                        <div className="">
                            <div className="grid md:grid-cols-12 md:gap-10 gap-4">
                                <div className="col-span-10">
                                    <section className="">
                                            {brands && brands.map((brand: any) => (
                                                <div key={brand?.id || brand?.brand_name}>
                                                    <div>
                                                        <h2 className="text-slate-800 text-xl font-semibold my-7">
                                                            Top Solar Inverters of {brand?.brand_name} ({brand?.products?.length})
                                                        </h2>
                                                    </div>
                                                    <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-5">
                                                        {brand?.products && brand.products.map((product: any) => (
                                                            <Card key={product?.id || product?.slug} className="p-4 rounded-md">
                                                                <Link href={`/products/${product?.slug}`}>
                                                                    <div className="relative h-[191px] flex flex-col justify-center items-center mb-3 rounded-md">
                                                                        <div className="w-full overflow-hidden rounded-md relative z-10 bg-default-100 dark:bg-default-200 h-full group">
                                                                            <Image
                                                                                alt={product?.title || 'Product image'}
                                                                                className="h-full w-full object-contain p-6 transition-all duration-300 group-hover:scale-105"
                                                                                src={CarImage} // Ensure CarImage is the correct source for your image
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
                                                                            {brand?.brand_name}
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
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    )
}

export default SubCategoryList;