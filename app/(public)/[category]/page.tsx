
import PageNotFound from '@/app/not-found';
import CategoryList from '@/components/category';
import React from 'react';

interface IPage { }

const page: React.FC<IPage> = (props) => {
    if (!props) {
        return <PageNotFound />
    }
    return (
        <CategoryList props={props}/>
    )
}

export default page;