'use client';
import React, { useEffect, useState } from 'react';
import { PageHead } from '../partials/public-header';
import LayoutLoader from '../layout-loader';
import { fetchCategoryBySlug } from '@/service/category.service';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ICategoryListProps {
    props: any;
}

const CategoryList: React.FC<ICategoryListProps> = ({ props }) => {
    const slug = props.params.category;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [pageTitle, setPageTItle] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, [slug])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response: any = await fetchCategoryBySlug(slug);
            if (response?.status === true && response?.statusCode === 200) {
                setPageTItle(response?.data?.industry)
                setCategories(response?.data?.categories);
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
                    <PageHead title={'Industry: ' + pageTitle} />
                    <section className="mx-10 my-10 bg-white rounded-md p-6 mt-10">
                        <h2 className="text-slate-800 text-xl font-semibold mb-7">Shop by Categories ({categories.length})</h2>
                        <div className="grid grid-cols-6 gap-8">
                            {categories && categories.map((category: any, index: number) => (
                                <div key={index} className="group relative flex flex-col items-center justify-center">
                                    <Link href={`/${slug}/${category.slug}`}
                                        className="relative w-full h-44 flex items-center justify-center rounded-md bg-white border border-gray-300 overflow-hidden shadow-sm mb-4">
                                        <img alt="" src="img/autoximg/MININEGIIUHY7.jpg" className="w-full object-cover" />
                                        <div
                                            className="absolute bottom-0 left-0 flex items-center justify-center gap-1.5 w-full bg-black/50 text-white text-sm font-semibold py-1 px-2 text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
                                                <path fill="white" fillRule="evenodd"
                                                    d="M8.5 0h-3v4.508c0 .13.055.255.154.348A.54.54 0 0 0 6.026 5h1.948c.14 0 .273-.052.372-.144a.48.48 0 0 0 .154-.348zM4.25 0H1.5A1.5 1.5 0 0 0 0 1.5v11A1.5 1.5 0 0 0 1.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 12.5 0H9.75v4.508c0 .49-.208.94-.55 1.26c-.338.317-.78.482-1.226.482H6.026c-.446 0-.888-.165-1.226-.482a1.73 1.73 0 0 1-.55-1.26zm4.51 11.1c0-.346.28-.626.624-.626h2.014a.625.625 0 0 1 0 1.25H9.384a.625.625 0 0 1-.625-.625Z"
                                                    clipRule="evenodd" />
                                            </svg>
                                            {category?._count?.products}
                                        </div>
                                    </Link>
                                    <div className="text-center">
                                        <Link href={`/${slug}/${category.slug}`} className="font-medium text-gray-800 hover:text-blue-600 text-md">{category.category_name}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className="text-center mt-12">
                            <a href="#" className="px-5 py-2 bg-red-600 rounded-md text-white font-semibold">VIEW ALL CATEGORIES</a>
                        </div> */}
                    </section>
                </>
            }
        </>
    )
}

export default CategoryList;