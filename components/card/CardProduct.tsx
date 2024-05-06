"use client";

import { CartProductType } from "@/lib/definitions";
import { useAppDispatch } from "@/redux/hooks";
import { BiSolidCartAdd } from "react-icons/bi";
import {Card ,Image , CardHeader , CardBody , CardFooter} from "@nextui-org/react";
import { addToCart } from "@/redux/features/cart/cartSlice";
import React from "react";

export default function CardProduct({
	id,
	image,
	name,
	price,
}: CartProductType) {
	const dispatch = useAppDispatch();

	return (
		<div>
            <div className="ml-52 mt-2 absolute ">
                <button
                    onClick={()=>dispatch(addToCart({id, name, image, price}))}
                    className="w-8 bg-white/50 rounded-lg"
                >
                    🛒
                </button>
            </div>
            <Card  className="py-4 w-[310px] ">
                <CardBody  className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl w-[300px] h-[200px]"
                        src={image}
                        width={300 }
                        height={200 }
                    />
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large line-clamp-1">{name}</h4>
                        <small className=" text-xl font-bold text-gray-900 dark:text-white">${price}</small>
                    </CardHeader>
                </CardBody>
            </Card>
		</div>
	);
}
