'use client';
import { PageHead } from "../partials/public-header";
import ProductList from "./list";

interface IProductPageProps { }

const ProductPage: React.FC<IProductPageProps> = () => {
  return (
    <>
    <PageHead title="Shop" />
    <ProductList />
    </>
  );
};

export default ProductPage;
