import React from 'react';
import FilterSidebar from './filter';
import DafaultPagination from './pagination/dafault-pagi';
import ProductBlock from './product-block';

interface IProductListProp {
    products?: any;
}

const ProductList: React.FC<IProductListProp> = ({
    products,
}) => {
    return (
        <section className="py-10 px-20">
            <div className="">
                <div className="grid md:grid-cols-12 md:gap-10 gap-4">
                    <div className="col-span-2">
                        <FilterSidebar />
                    </div>
                    <div className="col-span-10">
                        <section className="">
                            <div className="">
                                <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                                    <ProductBlock products={products} />
                                </div>
                                {/* <div className="mt-8">
                                    <DafaultPagination />
                                </div> */}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductList;