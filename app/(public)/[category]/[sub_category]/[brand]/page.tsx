
import PageNotFound from '@/app/not-found';
import BrandProductList from '@/components/brand';
import React from 'react';

interface IPage { }

const page: React.FC<IPage> = (props) => {
    if (!props) {
        return <PageNotFound />
    }
    return (
        <BrandProductList props={props}/>
    )
}

export default page;