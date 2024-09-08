import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { fetchProductAttributesById } from '@/service/product.service';
import { useRouter } from 'next/navigation';

interface IAttributeProps {
    product: any;
}

const Attribute: React.FC<IAttributeProps> = ({ product }) => {
    const [productId, setProductId] = useState<number>(product?.parent_id);
    const navigation = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<any>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

    const handleValueChange = (product_slug: string, option: string, value: string) => {
        setSelectedAttributes((prevState: any) => {
            const updatedAttributes = {
                ...prevState,
                [option]: value,
            };
            handleVariantNavigation(product_slug, updatedAttributes); // Pass updated attributes to function
            return updatedAttributes;
        });
    };

    const setDefaultAttributes = (fetchedAttributes: any[]): Record<string, string> => {
        const defaultAttributes: Record<string, string> = {};
        fetchedAttributes.forEach((attribute, index) => {
            const productOptionId = [product.option_one_id, product.option_two_id, product.option_three_id][index];
            const matchingValue = attribute.product_attribute_values.find(
                (option: any) => option.attribute_value.id === productOptionId
            );
            if (matchingValue) {
                defaultAttributes[`option_${index + 1}`] = matchingValue.attribute_value.slug;
            }
        });
        return defaultAttributes;
    };

    const fetchProductAttributes = async () => {
        setIsLoading(true);
        try {
            const response = await fetchProductAttributesById(product?.parent_id);
            if (response?.status === true && response?.statusCode === 200) {
                const fetchedAttributes = response?.data;
                setAttributes(fetchedAttributes);
                setSelectedAttributes(setDefaultAttributes(fetchedAttributes));
            } else {
                toast.error(response?.message);
            }
        } catch (error: any) {
            toast.error(error?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVariantNavigation = (product_slug: string, updatedAttributes: Record<string, string>) => {
        const slug = product_slug; // Get the product slug
        const option1 = updatedAttributes['option_1'] || '';
        const option2 = updatedAttributes['option_2'] || '';
        const option3 = updatedAttributes['option_3'] || '';
        // Recreate the URL with the selected options, ensuring only non-empty values are included
        const urlParts = [slug, option1, option2, option3].filter(Boolean); // Remove any empty values
        const url = urlParts.join('-'); // Join the parts with a dash
        navigation.replace('/products/' + url);
    };

    useEffect(() => {
        if (productId) {
            fetchProductAttributes();
        }
    }, [productId]);
    return (
        <div className="space-y-6">
            {attributes && attributes.map((attribute: any, attrIndex: number) => {
                const optionIndex = `option_${attrIndex + 1}`;
                return (
                    <div key={attrIndex} className={`space-y-4 ${attrIndex === 0 && 'border-t'} pt-6`}>
                        <h4 className="font-bold text-base">{attribute?.attribute?.attribute_name}</h4>
                        <div className="flex items-center justify-start gap-4">
                            <RadioGroup
                                value={selectedAttributes[optionIndex]}
                                onValueChange={(value) => handleValueChange(attribute?.product?.slug, `option_${attrIndex + 1}`, value)}
                            >
                                {attribute.product_attribute_values.map((option: any, optIndex: number) => {
                                    const slug = option?.attribute_value?.slug;
                                    const value = option?.attribute_value?.attribute_value_name;
                                    const id = `${value}_${optIndex}`;
                                    return (
                                        <Label
                                            key={optIndex}
                                            className={cn("flex items-center gap-1 bg-default-100 px-2 py-1.5 rounded-md cursor-pointer",
                                                { "bg-primary/10": selectedAttributes[optionIndex] === slug }
                                            )}
                                            htmlFor={id}
                                        >
                                            <RadioGroupItem
                                                value={slug}
                                                id={id}
                                                color="primary"
                                            />
                                            <span className="text-default-600">
                                                {value}
                                            </span>
                                        </Label>
                                    );
                                })}
                            </RadioGroup>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Attribute;
