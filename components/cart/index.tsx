'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import toast from "react-hot-toast";
import { fetchProductFormCart, removeProductFromCart, updateProductFromCart } from "@/service/cart.service";
import { Icon } from "@iconify/react";
import { fetchUserAddress } from '@/service/user-address.service';

interface IAddress {
  uuid: string;
  address_name: string;
  pincode: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
}

interface IProduct {
  uuid: string;
  title: string;
  category_id: number;
  slug: string;
  description: string;
  tags: string[];
}

interface IVarient {
  uuid: string;
  product: IProduct;
  quantity: number;
  price: string;
}

interface ColumnProps {
  key: string;
  label: string;
}
const columns: ColumnProps[] = [
  {
    key: "image",
    label: "image",
  },
  {
    key: "product",
    label: "product",
  },
  {
    key: "price",
    label: "price",
  },
  {
    key: "quantity",
    label: "quantity",
  },
  {
    key: "subtotal",
    label: "subtotal",
  },
  {
    key: "action",
    label: "Action",
  },
];

interface ICartCalculations {
  totalPrice: number;
  totalQuantity: number;
  grandTotal: number;
}

const CartPage = () => {
  const [cartProduct, setCartProduct] = useState<IVarient[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const [address, setAddress] = useState<IAddress[]>([]);
  const shippingCharge: number = 0;
  const [calculations, setCalculations] = useState<ICartCalculations>({
    totalPrice: 0,
    totalQuantity: 0,
    grandTotal: 0,
  });

  //function to formate the address....
  const formatAddress = (address: IAddress): string => {
    const addressParts = [
      address.address1,
      address.address2 ? address.address2 : '',
      address.landmark,
      address.city,
      address.state,
      address.country,
      address.pincode
    ].filter(part => part.trim() !== '').join(', ');
    return addressParts;
  };
  // Function to calculate totals
  const calculateCartTotals = (carts: any): ICartCalculations => {
    const { totalPrice, totalQuantity } = carts.reduce(
      (acc: any, item: any) => {
        const itemTotal = item.price * item.quantity;
        acc.totalPrice += itemTotal;
        acc.totalQuantity += item.quantity;
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
    // Calculate grand total
    const grandTotal = totalPrice + shippingCharge;

    return {
      totalPrice: totalPrice,
      totalQuantity,
      grandTotal: grandTotal,
    };
  };

  //function to handle cart decrement.
  const handleCartIncrement = async (variant: any) => {
    try {
      const payload = {
        cart_id: variant.uuid,
        variant_id: variant?.product?.uuid,
        quantity: variant?.quantity + 1,
      };

      const response = await updateProductFromCart(payload);
      if (response?.status === true && response?.statusCode === 200) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
      fetchProductFromCartHandler();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //function to handle cart decrement
  const handleCartDecrement = async (variant: any) => {
    try {
      if (variant?.quantity > 1) {
        const payload = {
          cart_id: variant.uuid,
          variant_id: variant?.product?.uuid,
          quantity: variant?.quantity - 1,
        };
        const response = await updateProductFromCart(payload);
        if (response?.status === true && response?.statusCode === 200) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
        fetchProductFromCartHandler();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //Function to handel delete cart
  const handleRecordDelete = async (uuid: string) => {
    try {
      const response: any = await removeProductFromCart(uuid);
      if (response?.status === true && response?.statusCode === 200) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
      fetchProductFromCartHandler();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //handler to select address.
  const handleAddressSelect = (uuid: string) => {
    setSelectedAddress((prevSelectedAddress: any) => {
      return prevSelectedAddress === uuid ? undefined : uuid
    }
    );
  };
  //function to fetch product from cart.
  const fetchProductFromCartHandler = async () => {
    try {
      const response = await fetchProductFormCart();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setCartProduct(response?.data?.result)
    } catch (error: any) {
      toast.error(error?.message);
    }
  }
  //function to fetch user address.
  const fetchUserAddressHandler = async () => {
    try {
      const response = await fetchUserAddress();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setAddress(response?.data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  //useEffetct to fetch product from cart and fetch user address.
  useEffect(() => {
    if (cartProduct.length == 0) {
      fetchProductFromCartHandler();
    }
    if (address.length == 0) {
      fetchUserAddressHandler();
    }
  }, []);

  //useEffect to calculate totals. 
  useEffect(() => {
    if (cartProduct) {
      const results = calculateCartTotals(cartProduct);
      setCalculations(results);
    }
  }, [cartProduct]);

  return (
    <>
      <section className="pt-24 px-20 pb-10">
        <div className="grid xl:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-8">
          <div className="md:col-span-9 space-y-8">
            <div>
              <div className="text-xl font-bold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0 mb-4">
                Product Details
              </div>
              <div>
                <Table className="border border-default-300">
                  <TableHeader className="bg-primary border-primary">
                    <TableRow className="">
                      {columns.map((column: ColumnProps) => (
                        <TableHead
                          key={column.key}
                          className="border text-primary-foreground border-primary "
                        >
                          {column.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartProduct?.length > 0 ? cartProduct?.map((variant: any) => {
                      return (
                        <TableRow key={variant.uuid}>
                          <TableCell className="border border-default-300 font-bold">
                            <Avatar className="w-20 h-auto">
                              <AvatarImage
                                src={variant?.avatar}
                                className="!h-auto !w-20 !aspect-auto"
                              />
                              <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="border border-default-300 font-bold">
                            {variant?.product?.title}
                          </TableCell>
                          <TableCell className="border border-default-300 font-bold">
                            ${variant?.price ? Number(variant.price).toFixed(2) : ""}
                          </TableCell>
                          <TableCell className="border border-default-300 font-bold">
                            <div className="flex w-[150px]">
                              <Button
                                className="rounded"
                                color="secondary"
                                variant="outline"
                                onClick={() => {
                                  handleCartDecrement(variant);
                                }}
                                disabled={variant?.quantity == 1}
                              >
                                -
                              </Button>
                              <Input
                                type="number"
                                value={variant?.quantity}
                              />
                              <Button
                                className="rounded"
                                color="secondary"
                                variant="outline"
                                onClick={() => {
                                  handleCartIncrement(variant);
                                }}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="border border-default-300 font-bold text-primary">
                            ${(variant?.quantity * variant?.price).toFixed(2)}
                          </TableCell>
                          <TableCell className="border border-default-300 font-bold text-primary text-center">
                            <Button
                              size="icon"
                              variant="outline"
                              className=" h-7 w-7"
                              color="secondary"
                              onClick={() =>
                                handleRecordDelete(variant?.uuid)
                              }
                            >
                              <Icon
                                icon="heroicons:trash"
                                className="h-4 w-4"
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }) : <>
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="!text-center"
                        >
                          {('No results')}
                        </TableCell>
                      </TableRow>
                    </>}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-xl font-bold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0 mb-4">
                Shipping Address
              </div>
              {address.map((add: IAddress) => (
                <div className="space-y-2" key={add.uuid}>
                  <div
                    className={cn(
                      "rounded-lg border p-4 w-full transition-all duration-200",
                      {
                        "border-success": selectedAddress === add.uuid,
                        "border-default-300": selectedAddress !== add.uuid
                      }
                    )}
                  >
                    <Checkbox
                      id={add.uuid}
                      className="space-x-3 w-full"
                      checked={selectedAddress === add.uuid}
                      onCheckedChange={() => handleAddressSelect(add.uuid)}
                    >
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex flex-1 gap-5 items-center">
                          <div className="space-y-1">
                            <h4 className="font-medium text-default-800">
                              {formatAddress(add)}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </Checkbox>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="text-xl font-bold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0 mb-4">
              Order Summary
            </div>
            <div className="space-y-4 mb-10">
              <p className="font-light flex justify-between">
                <span className="w-40 inline-block">Price</span>{" "}
                <b className="font-bold">${`${calculations?.totalPrice}`}</b>
              </p>
              <p className="font-light flex justify-between">
                <span className="w-40 inline-block">Quantity</span>{" "}
                <b className="font-bold">{`${calculations?.totalQuantity}`}</b>
              </p>
              <p className="font-light flex justify-between">
                <span className="w-40 inline-block">Total</span>{" "}
                <b className="font-bold">${`${calculations?.totalPrice}`}</b>
              </p>
              <p className="font-light flex justify-between">
                <span className="w-40 inline-block">Shipping</span>{" "}
                <b className="font-bold">${shippingCharge}</b>
              </p>
              <p className="font-light flex justify-between">
                <span className="w-40 inline-block">Coupon</span>{" "}
                <b className="font-bold">-</b>
              </p>
            </div>
            <div className="py-6 border-b mb-8">
              <Input type="text" placeholder="Enter Coupon Code" />
            </div>
            <div className="font-light text-2xl flex justify-between">
              <span className="w-40 inline-block">Grand Total</span>{" "}
              <b className="font-bold text-primary">
                ${calculations?.grandTotal.toFixed(2)}
              </b>
            </div>
            <div className="flex gap-4 mt-20">
              <Button color="primary" className="w-full">
                <Link href="/product-quatation">Proceed to Payment</Link>
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CartPage;