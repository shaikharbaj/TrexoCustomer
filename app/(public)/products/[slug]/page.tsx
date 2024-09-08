import React from 'react';
import ProductDetail from '@/components/product-detail';
import PageNotFound from '@/app/not-found';

interface IPage{}

const Page:React.FC<IPage> = (props) => {
    if (!props) {
        return <PageNotFound />
    }
    return(
        <ProductDetail props={props} />
    )
}

export default Page;