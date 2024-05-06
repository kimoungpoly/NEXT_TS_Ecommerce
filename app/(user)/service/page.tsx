"use client";
import CardProduct from "@/components/card/CardProduct";
import { useGetProductsQuery } from "@/redux/service/product";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ENDPOINT = "https://store.istad.co/api/products/";

export default function Service() {
	const { data: session } = useSession();
	const [products, setProducts] = useState([]);
	const router = useRouter();

	// Get products with generated hook
	const { data, error, isLoading } = useGetProductsQuery({
		page: 1,
		pageSize: 10,
	});
	console.log("Data: ", data);

	useEffect(() => {
		fetch(ENDPOINT)
			.then((res) => res.json())
			.then((data) => setProducts(data.results));
	}, []);

	return (
		<>
			{session ? (
				<div className="mt-10 flex justify-center flex-wrap ">
					<div className=" mt-10 grid grid-cols-5 gap-4 max-md:grid-cols-1 max-md:ml-11  max-xl:grid-cols-2 max-2xl:grid-cols-3 ">
						{products.map((product: any, index) => (
							<CardProduct
								onClick={() => router.push(`/service/${product.id}`)}
								key={index}
								id={product.id}
								image={product.image}
								name={product.name}
								price={product.price}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="w-full h-screen flex flex-col justify-center items-center">
					Unauthorize!
				</div>
			)}
		</>
	);
}
