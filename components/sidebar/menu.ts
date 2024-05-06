import {
	HiArrowSmRight,
	HiChartPie, HiHome,
	HiInbox,
	HiShoppingBag,
	HiTable,
	HiUser,
	HiViewBoards,
} from "react-icons/hi";

export const MenuList = [
	{
		name: "Dashboard",
		path: "/dashboard",
		icon: HiChartPie,
	},
	{
		path: "/setting",ame: "Setting",
		icon: HiViewBoards,
	},
	{
		name: "Inbox",
		path: "#",
		icon: HiInbox,
		label: "3",
	},
	{
		name: "Users",
		path: "#",
		icon: HiUser,
	},
	{
		name: "Products",
		path: "#",
		icon: HiShoppingBag,
	},
	{
		name: "Exit",
		path: "/",
		icon: HiHome,
	},

];
