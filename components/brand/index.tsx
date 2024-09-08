'use client';
import React, { useEffect, useState } from 'react';
import { PageHead } from '../partials/public-header';
import LayoutLoader from '../layout-loader';
import toast from 'react-hot-toast';
import { fetchProductByBrandSlug } from '@/service/product.service';
import { useThemeStore } from '@/store';
import ProductList from '../products/list';

interface IBrandProductListProps {
    props: any;
}

const BrandProductList: React.FC<IBrandProductListProps> = ({ props }) => {
    const { isRtl } = useThemeStore();
    const slug = props.params.brand;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const [pageTitle, setPageTitle] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, [slug])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response: any = await fetchProductByBrandSlug(slug);
            if (response?.status === true && response?.statusCode === 200) {
                setPageTitle(response?.data?.brand)
                setProducts(response?.data?.products);
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
                    <PageHead title={'Brand: ' + pageTitle} />
                    <ProductList products={products} />
                </>
            }
        </>
    )
}

export default BrandProductList;