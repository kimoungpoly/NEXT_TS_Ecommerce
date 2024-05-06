"use client";
import { ProductType } from "@/lib/definitions";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import {link} from "fs";

export default function Dashboard() {
	const [getProduct, setProduct] = useState([]);
	const [filter, setFilter] = useState([]);
	const [search, setSearch] = useState("");
	const [products, setProducts] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState(false);
	const [productDetail, setProductDetail] = useState<ProductType | null>(null);
	// fetch products
	useEffect(() => {
		setLoading(true);
		fetch("https://store.istad.co/api/products/")
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.results);
					setFilter(data.results);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (!search) {
			setFilter(getProduct);
			return;
		}
		const result = getProduct.filter((item: ProductType) => {
			return item.name?.toLowerCase().includes(search.toLowerCase());
		});

		setFilter(result);
	}, [getProduct, search]);

	const [imagePlaceholder, setImagePlaceholder] = useState<string>(
		"https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
	);

	const handleViewProduct = (product: ProductType) => {
		setProductDetail(product);
		setOpenModal(true);
	};


	const columns: TableColumn<ProductType>[] = [
		{
			name: "Product Name",
			selector: (row) => row.name,
		},
		{
			name: "Price (USD)",
			selector: (row) => row.price,
			sortable: true,
		},
		{
			name: "Image",
			selector: (row): any => (
				<img className="w-16 h-16" src={row.image} alt={row.image} />
			),
			sortable: true,
		},
		{
			name: "Category",
			selector: (row) => row.category,
			sortable: true,
		},
		{
			name: "Action",
			selector: (row): any => (
				<div>
					<button
						onClick={() => handleViewProduct(row)}
						className="text-blue-600 mx-2"
					>
						view
					</button>
					<button
						className="text-yellow-400 mx-2"
					>
						edit
					</button>
					<button className="text-red-600 mx-2">delete</button>
				</div>
			),
		},
	];

	return (
		<main className="h-screen">
			{/*handle create product*/}
			<div className="justify-start flex f">
				<a href="/product" className="text-sm my-5 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 border-b-medium text-white">
					Create Product
				</a>
			</div>
			<DataTable
				fixedHeader={true}
				fixedHeaderScrollHeight="500px"
				progressPending={loading}
				columns={columns}
				pagination
				customStyles={customStyles}
				striped
				highlightOnHover
				subHeader
				subHeaderComponent={
					<input
						className="border-[1px] px-3 py-2 w-1/2 mb-5 rounded-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					></input>
				}
				data={filter}
			/>

			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>Product Detial</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<Image
							src={productDetail?.image || imagePlaceholder}
							alt={productDetail?.name || "Untitle"}
							width={250}
							height={300}
						/>
						<h3 className="text-3xl text-gray-700">{productDetail?.name || "Untitle"}</h3>
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							{productDetail?.desc || "No description"}
						</p>

					</div>
				</Modal.Body>
			</Modal>
		</main>
	);
}

const customStyles = {
	rows: {
		style: {
			minHeight: "72px", // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: "38px", // override the cell padding for head cells
			paddingRight: "8px",
			fontSize: "1.2rem",
			backgroundColor: "#f1f1f1",
		},
	},
	cells: {
		style: {
			paddingLeft: "38px", // override the cell padding for data cells
			paddingRight: "8px",
		},
	},
};
