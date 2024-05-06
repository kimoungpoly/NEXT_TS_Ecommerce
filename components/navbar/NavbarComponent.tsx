"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Button, Avatar, Dropdown } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { MenuList } from './menu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserProfile, selectAvatar, selectBio } from '@/redux/features/userProfile/userProfileSlice';

type MenuItem = {
	name: string;
	path: string;
	active: boolean;
};

export default function NavbarComponent() {

	const count = useAppSelector((state) => state.counter.value);
	const avatar = useAppSelector(selectAvatar);
	const bio = useAppSelector(selectBio);
	const pathname = usePathname();
	const [menu, setMenu] = useState<MenuItem[]>(MenuList);
	const { data: session } = useSession();
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, []);

	// State to manage login status
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	// // Handle sign in with Google
	// const handleSignInGoogle = () => signIn('google');

	// // Handle sign in with GitHub
	// const handleSignInGitHub = () => signIn('github');

	// // Function to handle login
	// const handleLogin = () => {
	// 	// Perform your login logic here
	// 	// Once login is successful, set isLoggedIn to true
	// 	setIsLoggedIn(true);
	// };

	// // Function to handle sign out
	// const handleSignOut = () => {
	// 	// Perform your sign out logic here
	// 	// Once signed out, set isLoggedIn to false
	// 	signOut();
	// 	setIsLoggedIn(false);
	// };

	// if (!session) {
	// 	return (
	// 		<main className="w-full h-screen flex flex-col justify-center items-center">
	// 			<p className="text-2xl mb-2">Not Signed In</p>
	// 			<button className="bg-blue-600 py-2 px-6 rounded-md text-white mb-2" onClick={handleSignInGoogle}>
	// 				Sign in with Google
	// 			</button>
	// 			<button className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2" onClick={handleSignInGitHub}>
	// 				Sign in with GitHub
	// 			</button>
	// 		</main>
	// 	);
	// }

	return (
		<Navbar fluid rounded className="w-full bg-white shadow-sm">
			<NavbarBrand className="sm:ml-32 mr-0" as={Link} href="/">
				<img src="/assets/logo.png" className="mr-3 h-14 sm:h-14" alt="Ecommerce" />
				<h3 className="font-bold text-xl">LY Store</h3>
			</NavbarBrand>
			<NavbarToggle />
			<NavbarCollapse>
				{menu.map((item, index) => (
					<NavbarLink key={index} as={Link} href={item.path} active={item.path === pathname}>
						{item.name}
					</NavbarLink>
				))}
			</NavbarCollapse>
			{/* <NavbarCollapse className="mr-32 flex justify-between items-center ">
				<div className="mt-3">
					<Link href="/cart">🛒</Link>
					<Navbar.Toggle />
				</div>
				<div>
					{isLoggedIn ? (
						<div className="flex">
							<Dropdown.Header>
								<span className="block text-sm">{session.user?.name}</span>
							</Dropdown.Header>
							<Dropdown.Item>
								<button className="bg-red-600 py-2 px-6 rounded-md text-white" onClick={handleSignOut}>
									Sign out
								</button>
							</Dropdown.Item>
							arrowIcon={false}
								inline
								label={<Avatar alt="User settings" img={session.user?.image as string} rounded />}

							<Navbar.Toggle />
						</div>
					) : (
						<div className="flex">
							<Button
								as={Link}
								href="/login"
								onClick={handleLogin}
							>
								Login
							</Button>

							<Navbar.Toggle />
						</div>
					)}
				</div>
			</NavbarCollapse> */}
		</Navbar>
	);
}