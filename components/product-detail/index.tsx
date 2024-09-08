'use client';
import React, { useEffect, useState } from 'react';
import PageHead from '../partials/public-header/page-header';
import DetailPage from './detail';
import toast from 'react-hot-toast';
import LayoutLoader from '../layout-loader';
import { fetchProductBySlug } from '@/service/product.service';

interface IProductDetailProps {
    props: any;
}

const ProductDetail: React.FC<IProductDetailProps> = ({ props }) => {
    const slug = props?.params?.slug;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [product, setProduct] = useState<any>();

    useEffect(() => {
        fetchData();
    }, [slug])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response: any = await fetchProductBySlug(slug);
            if (response?.status === true && response?.statusCode === 200) {
                setPageTitle(response?.data?.title)
                setProduct(response?.data);
            } else {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error?.message);
            console.error('Error fetching product:', error);
        } finally {
            setIsLoading(false);
        };
    }

    return (
        <>
            {isLoading ? <LayoutLoader /> :
                <>
                    <PageHead title={pageTitle} />
                    <DetailPage product={product} />
                </>
            }
        </>
    )
}

export default ProductDetail;