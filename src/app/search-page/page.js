"use client"

import { useState } from "react"
import StarRating from "../components/ImageSection/rating"
import { videogames } from "../dummydata"
import Link from "next/link"
import Image from "next/image"

const SearchPage = () => {
    const numResults = 768
    const [category, setCategory] = useState("Video Games")
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

    const products = videogames

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
                                                <div className="flex gap-3"><input onChange={() => { setCategory('Hardware and Accessories') }} checked={category === 'Hardware and Accessories' ? true : false} type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Hardware and Accessories</p></div>
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
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>PlayStation</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Xbox</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Virtual Reality</p></div>
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
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Activision</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Rockstar</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Sony</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>Microsoft</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>EA</p></div>
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
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>{"E (Everyone)"}</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>{"T (Teen)"}</p></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><p>{"M (Mature)"}</p></div>
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
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={5} /></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={4} /></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={3} /></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={2} /></div>
                                                <div className="flex gap-3"><input type="checkbox" className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"></input><StarRating rating={1} /></div>
                                            </div>
                                        )
                                    }
                                </div>
                                <hr className="ml-10 mr-10"></hr>
                            </div>
                        ) : (
                            <div className="hidden"></div>
                        )
                    }
                    <div className={`text-center md:text-left ${hidefilters ? 'col-span-2 md:col-span-4 md:ml-8' : 'col-span-1 md:col-span-3'}  grid ${hidefilters ? 'grid-cols-2 md:grid-cols-4 px-4' : 'grid-cols-1 md:grid-cols-3'} gap-10`}>
                        {
                            products.length > 0 ? products.map((item, index) => {
                                return (
                                    <div className="flex justify-center items-center md:items-center md:justify-center bg-white rounded-lg p-3 py-5 shadow-xl hover:shadow-2xl hover:translate-y-[-2px] overflow-hidden">
                                        <Link href={`#`} key={index} className="flex flex-col gap-3 items-center justify-center w-60 h-full">
                                            <div className="relative h-60 w-48">
                                                <Image fill={true} alt="" src={item.imgUrls[0]}></Image>
                                            </div>
                                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                                <p className="font-bold">{item.name}</p>
                                                <StarRating rating={item.rating} />
                                                <p>${item.price}</p>
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