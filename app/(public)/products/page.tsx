import ProductPage from '@/components/products';
import React from 'react';

interface IPage { }

const page: React.FC<IPage> = () => {
    return (
        <ProductPage />
    )
}

export default page;