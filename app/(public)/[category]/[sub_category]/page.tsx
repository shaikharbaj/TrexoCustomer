
import PageNotFound from '@/app/not-found';
import SubCategoryList from '@/components/sub-category';
import React from 'react';

interface IPage { }

const page: React.FC<IPage> = (props) => {
    if (!props) {
        return <PageNotFound />
    }
    return (
        <SubCategoryList props={props}/>
    )
}

export default page;