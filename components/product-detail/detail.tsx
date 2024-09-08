import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import ImageBlock from './image-block';
import Attribute from './attribute';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/currency';
import { addProductToCart } from '@/service/cart.service';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import DOMPurify from 'dompurify';

interface IDetailPageProps {
    product: any;
}

const DetailPage: React.FC<IDetailPageProps> = ({
    product
}) => {
    const navigation = useRouter();
    const [cartButon, setCartButton] = useState<boolean>(false);
    const sanitizedDescription = DOMPurify.sanitize(product?.description || '');

    const addToCart = async () => {
        const payload = {
            product_id: product?.uuid
        };
        try {
            setCartButton(true);
            const response = await addProductToCart(payload);
            if (response?.status === false) {
                toast.error(response?.message);
                return;
            }
            toast.success(response.message);
        } catch (error: any) {
            toast.error(error?.message || "An error occurred");
        }
        finally {
            setCartButton(false);
        }
    }

    return (
        <section className="py-10 px-20">
            <div className="grid xl:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-5">
                <ImageBlock />
                <div className="md:col-span-7 space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className=" text-xs">{product?.brand?.brand_name}</h4>
                            <h1 className=" font-bold text-3xl my-3">{product?.title}</h1>
                        </div>
                        <h2 className="text-primary font-semibold text-3xl flex items-center gap-2">
                            {formatCurrency(product?.price)}
                        </h2>
                    </div>
                    <Attribute product={product} />
                    <div className="space-y-4  border-t pt-6">
                        <h4 className=" font-bold text-base">About This Product</h4>
                        <p  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}/>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Button color="secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </Button>
                        <Button color="secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </Button>
                        <Button
                            color="primary"
                            variant="outline"
                            onClick={addToCart}
                            disabled={cartButon}
                        >
                            {cartButon && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {cartButon ? `Loading...` : `Add to Cart`}
                        </Button>
                        <Button color="primary">
                            <Link href="/product-summary">
                                Buy Now
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DetailPage;