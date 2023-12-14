"use client"

import { useEffect, useState } from "react"
import StarRating from "../components/ImageSection/rating"
import { videogames } from "../dummydata"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"


const SearchPage = () => {
    const numResults = 768
    const [category, setCategory] = useState("")
    const [platform, setPlatform] = useState([])
    const [manufacturer, setManufacturer] = useState([])
    const [audience, setAudience] = useState([])
    const [rating, setRating] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const handlePlatformChange = (pf) => {
        if (platform.includes(pf)) {
            setPlatform(platform.filter((selected) => selected !== pf));
        } else {
            setPlatform([...platform, pf]);
        }
    };

    const handleManufacturerChange = (mf) => {
        if (manufacturer.includes(mf)) {
            setManufacturer(manufacturer.filter((selected) => selected !== mf));
        } else {
            setManufacturer([...manufacturer, mf]);
        }
    };

    const handleAudienceChange = (ad) => {
        if (audience.includes(ad)) {
            setAudience(audience.filter((selected) => selected !== ad));
        } else {
            setAudience([...audience, ad]);
        }
    };

    const handleRatingChange = (rt) => {
        if (rating.includes(rt)) {
            setRating(rating.filter((selected) => selected !== rt));
        } else {
            setRating([...rating, rt]);
        }
    };

    useEffect(() => {
        console.log(
            "Category: ", category,
            "\nPlatform: ", platform,
            "\nManufacturer: ", manufacturer,
            "\nAudience: ", audience,
            "\nRating: ", rating
        )
    }, [category, platform, manufacturer, audience, rating])

    const [hidefilters, setHidefilters] = useState(false)
    const [categorydd, setCategorydd] = useState(false)
    const [pricedd, setPricedd] = useState(false)
    const [minPrice, setMinPrice] = useState(false)
    const [maxPrice, setMaxPrice] = useState(false)
    const [platformdd, setPlatformdd] = useState(false)
    const [manufacturerdd, setManufacturerdd] = useState(false)
    const [ratingdd, setRatingdd] = useState(false)
    const [saledd, setSaledd] = useState(false)
    const [audiencedd, setAudiencedd] = useState(false)
    const [data, setData] = useState(false)
    const [products, setProducts] = useState([])

    const toggleDD = (variable, setter) => {
        setter(!variable);
    }

    const toggleHF = () => {
        setHidefilters(!hidefilters);
    }

    const setPrice = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products/search');
                console.log("API Request Executed : ", response)
                setData(true)
                setProducts(response.data)
                setFilteredProducts(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (data === false) {
            fetchData();
        }
        return () => {
            console.log('Cleanup function ran!');
        };
    }, []);

    function ApplyFilters() {
        setFilteredProducts(prevProducts => {
            return products.filter(product => {
                let flag = true
                if (category === "Video games" && product.type["S"] !== "GAME") {
                    flag=false
                }
                if (category === "Consoles" && product.type["S"] !== "CONSOLE") {
                    flag=false
                }
                if (category === "Accessories" && product.type["S"] !== "ACCESSORY") {
                    flag=false
                }

                const productPrice = parseFloat(product.price["N"]);
                if (productPrice <= minPrice && productPrice >= maxPrice) {
                    flag = false;
                }

                if (platform.length > 0) {
                    const isPlaystationSelected = platform.includes("playstation");
                    const isXboxSelected = platform.includes("xbox");
                    const isVRSelected = platform.includes("vr");
                    if (
                      (product.platform["S"] === "PS4" || product.platform["S"] === "PS5") && !isPlaystationSelected ||
                      (product.platform["S"] === "XBOX") && !isXboxSelected ||
                      (product.platform["S"] === "VR") && !isVRSelected
                    ) {
                      flag = false;
                    }
                }

                if (manufacturer.length > 0) {
                    const lowercaseManufacturer = product.manufacturer["S"].toLowerCase();
                    const lowercaseManufacturers = manufacturer.map(m => m.toLowerCase());
                    if (!lowercaseManufacturers.includes(lowercaseManufacturer)) {
                      flag = false;
                    }
                }

                if (audience.length > 0 && !audience.includes(product.esrb["S"])) {
                    flag=false
                }

                console.log("Product Rating: ",product.rating["N"])

                if (rating.length > 0 && rating.every(r => r !== product.rating["N"])) {
                    flag = false;
                  }
                  

                return flag;
            });
        });
    }

    return (
        <div className="bg-gray-100 pt-20">
            <div className="">
                <div className="px-5 pt-10 pb-5">
                    <p className="font-bold text-black text-4xl">{category}</p>
                    <p className="font-light text-black text-lg my-2">{numResults} Results</p>
                    <div className="flex flex-row gap-5">
                        <button onClick={() => toggleHF()} className="bg-gray-300 text-black px-6 py-2 flex items-center justify-center text-sm rounded-lg border-2 border-transparent hover:bg-white hover:border-2 hover:border-black"><span className="material-icons text-black">filter_list</span> Filter</button>
                        <div className="relative inline-block">
                            <select className="bg-gray-300 text-black px-6 py-3  flex items-center justify-center text-sm rounded-lg border-2 border-transparent hover:bg-white hover:border-2 hover:border-black">
                                <option value="">Sort</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                    <hr className="my-5 border-gray-300" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {
                        hidefilters == false ? (
                            <div className={`col-span-1`}>
                                <div className="p-10 flex flex-col gap-5">
                                    <span className="flex justify-between"><h1>Shop by Category </h1><button onClick={() => toggleDD(categorydd, setCategorydd)}>{categorydd ? <span className="material-icons">remove</span> : <span className="material-icons">add</span>}</button></span>
                                    {
                                        categorydd && (
                                            <div>
                                                <div className="flex gap-3"><input onChange={() => { setCategory('Video Games') }} checked={category === 'Video Games' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Video Games</p></div>
                                                <div className="flex gap-3"><input onChange={() => { setCategory('Consoles') }} checked={category === 'Consoles' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Consoles</p></div>
                                                <div className="flex gap-3"><input onChange={() => { setCategory('Accessories') }} checked={category === 'Accessories' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Hardware</p></div>
                                                <div className="flex gap-3"><input onChange={() => { setCategory('Clothing') }} checked={category === 'Clothing' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Clothing</p></div>
                                            </div>
                                        )
                                    }

                                </div>
                                <hr className="ml-10 mr-10" />
                                <div className="p-10 flex flex-col gap-5">
                                    <span className="flex justify-between"><h1>Shop by Price</h1><button onClick={() => toggleDD(pricedd, setPricedd)}>{pricedd ? <span className="material-icons">remove</span> : <span className="material-icons">add</span>}</button></span>
                                    {
                                        pricedd && (
                                            <div>
                                                <div className="flex gap-3"><input onChange={() => { setPrice(20, 50) }} checked={minPrice === 20} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>20$ - $50</p></div>
                                                <div className="flex gap-3"><input onChange={() => { setPrice(50, 100) }} checked={minPrice === 50} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>$50 - $100</p></div>
                                                <div className="flex gap-3"><input onChange={() => { setPrice(100, 1000000) }} checked={minPrice === 100} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Over $100</p></div>
                                            </div>
                                        )
                                    }

                                </div>
                                <hr className="ml-10 mr-10" />
                                <div className="p-10 flex flex-col gap-5">
                                    <span className="flex justify-between"><h1>Shop by Platform </h1><button onClick={() => toggleDD(platformdd, setPlatformdd)}>{platformdd ? <span className="material-icons">remove</span> : <span className="material-icons">add</span>}</button></span>
                                    {
                                        platformdd && (
                                            <div>
                                                <div className="flex gap-3"><input onChange={() => handlePlatformChange('playstation')} checked={platform.includes('playstation')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>PlayStation</p></div>
                                                <div className="flex gap-3"><input onChange={() => handlePlatformChange('xbox')} checked={platform.includes('xbox')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Xbox</p></div>
                                                <div className="flex gap-3"><input onChange={() => handlePlatformChange('vr')} checked={platform.includes('vr')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Virtual Reality</p></div>
                                            </div>
                                        )
                                    }
                                </div>
                                <hr className="ml-10 mr-10"></hr>
                                <div className="p-10 flex flex-col gap-5">
                                    <span className="flex justify-between"><h1>Shop by Manufacturer </h1><button onClick={() => toggleDD(manufacturerdd, setManufacturerdd)}>{manufacturerdd ? <span className="material-icons">remove</span> : <span className="material-icons">add</span>}</button></span>
                                    {
                                        manufacturerdd && (
                                            <div>
                                                <div className="flex gap-3"><input onChange={() => handleManufacturerChange('Activision')} checked={manufacturer.includes('Activision')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Activision</p></div>
                                                <div className="flex gap-3"><input onChange={() => handleManufacturerChange('Rockstar')} checked={manufacturer.includes('Rockstar')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Rockstar</p></div>
                                                <div className="flex gap-3"><input onChange={() => handleManufacturerChange('EA')} checked={manufacturer.includes('EA')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>EA</p></div>
                                            </div>
                                        )
                                    }
                                </div>
                                <hr className="ml-10 mr-10"></hr>
                                <div className="p-10 flex flex-col gap-5">
                                    <span className="flex justify-between"><h1>Shop by Audience </h1><button onClick={() => toggleDD(audiencedd, setAudiencedd)}>{audiencedd ? <span className="material-icons">remove</span> : <span className="material-icons">add</span>}</button></span>
                                    {
                                        audiencedd && (
                                            <div>
                                                <div className="flex gap-3"><input onChange={() => handleAudienceChange('E')} checked={audience.includes('E')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>{"E (Everyone)"}</p></div>
                                                <div className="flex gap-3"><input onChange={() => handleAudienceChange('T')} checked={audience.includes('T')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>{"T (Teen)"}</p></div>
                                                <div className="flex gap-3"><input onChange={() => handleAudienceChange('M')} checked={audience.includes('M')} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>{"M (Mature)"}</p></div>
                                            </div>
                                        )
                                    }
                                </div>
                                <hr className="ml-10 mr-10"></hr>
                                <div className="p-10 flex flex-col gap-5">
                                    <span className="flex justify-between"><h1>Shop by Rating </h1><button onClick={() => toggleDD(ratingdd, setRatingdd)}>{ratingdd ? <span className="material-icons">remove</span> : <span className="material-icons">add</span>}</button></span>
                                    {
                                        ratingdd && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-3"><input onChange={() => handleRatingChange(5)} checked={rating.includes(5)} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={5} /></div>
                                                <div className="flex gap-3"><input onChange={() => handleRatingChange(4)} checked={rating.includes(4)} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={4} /></div>
                                                <div className="flex gap-3"><input onChange={() => handleRatingChange(3)} checked={rating.includes(3)} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={3} /></div>
                                                <div className="flex gap-3"><input onChange={() => handleRatingChange(2)} checked={rating.includes(2)} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={2} /></div>
                                                <div className="flex gap-3"><input onChange={() => handleRatingChange(1)} checked={rating.includes(1)} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={1} /></div>
                                            </div>
                                        )
                                    }
                                </div>
                                <hr className="ml-10 mr-10"></hr>
                                <div className="flex flex-col ml-8 my-5 justify-start items-start">
                                    <button onClick={() => ApplyFilters()} className="bg-gray-200 my-4 text-black text-xl rounded-xl py-3 px-8 hover:bg-gray-300">Apply Filters</button>
                                </div>

                            </div>
                        ) : (
                            <div className="hidden"></div>
                        )
                    }
                    <div className={`text-center md:text-left ${hidefilters ? 'col-span-2 md:col-span-4 md:ml-8' : 'col-span-1 md:col-span-3'}  grid ${hidefilters ? 'grid-cols-2 md:grid-cols-4 px-4' : 'grid-cols-1 md:grid-cols-3'} gap-10`}>
                        {
                            filteredProducts.length > 0 ? filteredProducts.map((item, index) => {
                                return (
                                    <div className="flex justify-center items-center md:items-center md:justify-center bg-white rounded-lg p-3 py-5 shadow-xl hover:shadow-2xl hover:translate-y-[-2px] overflow-hidden h-[385px]">
                                        <Link href={`#`} key={index} className="flex flex-col gap-3 items-center justify-center w-60 h-full">
                                            <div className="relative h-60 w-48">
                                                <Image fill={true} alt="game" src={item.images.L[0].S}></Image>
                                            </div>
                                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                                <p className="font-bold">{item.name["S"]}</p>
                                                <StarRating rating={item.rating["N"]} />
                                                <p>${item.price["N"]}</p>
                                            </div>
                                        </Link>
                                    </div>


                                )
                            }) : <div className="col-span-3 flex justify-center items-center text-4xl text-center font-bold">No Product Found</div>


                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage