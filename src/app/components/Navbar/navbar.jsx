"use client"

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image"
import styles from './navbar.module.css'
import Link from "next/link";

const Navbar = () => {
    const [showMenu, setShowMenu] = React.useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchBarRef = useRef(null);

    const handleSearchClick = () => {
        setIsSearchActive(!isSearchActive);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setIsSearchActive(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const Categories = [
        {
            id: 1,
            title: "Video Games",
            url: ""
        },
        {
            id: 2,
            title: "Consoles",
            url: ""
        },
        {
            id: 3,
            title: "Accessories",
            url: ""
        }
    ]

    return (
        <div className="bg-white h-20 relative">
            <div className="grid grid-cols-12 gap-5">
                <div className="ps-3 col-span-2 flex flex-row items-center gap-5 lg:gap-10">
                    <button onClick={toggleMenu} className="flex flex-col items-center justify-center hover:text-red-500 cursor-pointer">
                        <span className="material-icons text-black" style={{ fontSize: "32px" }}>menu</span>
                        <h1 className="text-xs font-semibold">Menu</h1>
                    </button>
                    <div className="h-20 w-40 relative hover:cursor-pointer">
                        <Image className="" src={"/images/logo.svg"} alt="Gamestop" fill={true}></Image>
                    </div>
                </div>
                <div className="col-span-6 h-full flex items-center">
                    <div onClick={handleSearchClick} ref={searchBarRef} className={`w-[250px] lg:w-[600px] h-10 lg:block flex flex-row justify-center items-center gap-1 lg:gap-5 p-2 ${isSearchActive ? "bg-white shadow-md" : "bg-gray-100"} transition duration-100 ease-in-out cursor-pointer`}>
                        <div className="mr-2 material-icons border-transparent text-gray-600 hover:border-b-2 hover:border-orange-600" style={{ fontSize: "20px" }}>search</div>
                        <input type="text" placeholder={isSearchActive ? "" : "Search games and more"} className="ml-2 w-[150px] lg:w-[500px] bg-transparent focus:outline-none" />
                        {
                            isSearchActive ? (
                                <span className="w-40"><span onClick={() => { setIsSearchActive(false) }} className="ml-1 lg:ml-5 hidden material-icons h-full text-gray-600" style={{ fontSize: "20px" }}>close</span></span>
                            ) :
                                (
                                    <span className="w-40"></span>
                                )
                        }
                    </div>
                </div>
                <div className="col-span-4 flex flex-row gap-2 pe-2 lg:pe-10 justify-end">
                    <button className="flex flex-col items-center justify-center hover:text-red-500 cursor-pointer w-20">
                        <span className="material-icons text-black" style={{ fontSize: "32px" }}>repeat</span>
                        <h1 className="text-xs font-semibold">Trade In</h1>
                    </button>
                    <button className="flex flex-col items-center justify-center hover:text-red-500 cursor-pointer w-20">
                        <span className="material-icons text-black" style={{ fontSize: "32px" }}>person</span>
                        <h1 className="text-xs font-semibold">Sign In</h1>
                    </button>
                    <button className="flex flex-col items-center justify-center hover:text-red-500 cursor-pointer w-20">
                        <span className="material-icons text-black" style={{ fontSize: "32px" }}>shopping_cart</span>
                        <h1 className="text-xs font-semibold">Cart</h1>
                    </button>
                </div>
            </div>
            <div style={{ width: showMenu ? '300px' : '0px' }} className={styles.sidenav}>
                <div className="p-5 flex flex-row justify-between items-center shadow-lg">
                    <h1 className="text-lg font-bold">Menu</h1>
                    <button className={styles.closebtn} onClick={toggleMenu}>
                        <span className="ml-1 lg:ml-5 hidden material-icons h-full" style={{ fontSize: "20px" }}>close</span>
                    </button>
                </div>
                <div className="p-10 px-5 flex flex-col items-start  gap-10">
                    <h1 className="font-bold text-lg">Shop By Category</h1>
                    {Categories.map((link) => (
                        <Link className={styles.underlineAnimation} href={link.url} key={link.id}> <h1 className="text-md text-black">{link.title}</h1> </Link>
                    ))}
                </div>
            </div>
            {showMenu && <div className={styles.overlay} ></div>}
        </div>
    )
}

export default Navbar