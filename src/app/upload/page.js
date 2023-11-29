"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const Upload = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [platform, setPlatform] = useState("");
    const [type, setType] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [rating, setRating] = useState("");
    const [price, setPrice] = useState(0);
    const [sale, setSale] = useState(false);
    const [saleprice, setSalePrice] = useState(0);
    const [esrb, setEsrb] = useState("");
    const [genre, setGenre] = useState("");
    const [images,setImages] = useState([]);

    useEffect(() => {
        console.log(`name: ${name}\ndesc: ${desc}\nplatform: ${platform}\ntype: ${type}\nman: ${manufacturer}\nrating: ${rating}\nprice: ${price}\nsale: ${sale}\nsaleprice: ${saleprice}\nesrb: ${esrb},\ngenre ${genre}`)
    },[name,desc,platform,type,manufacturer,rating,price,sale,saleprice,esrb,genre]);

    function handleChange(e){
        const {name,value} = e.target
        if(name=="name"){setName(value);}
        else if(name=="desc"){setDesc(value);}
        else if(name=="platform"){setPlatform(value);}
        else if(name=="type"){setType(value);}
        else if(name=="price"){setPrice(value);}
        else if(name=="manufacturer"){setManufacturer(value);}
        else if(name=="rating"){setRating(value);}
        else if(name=="sale"){setSale(!sale);}
        else if(name=="saleprice"){setSalePrice(value);}
        else if(name=="esrb"){setEsrb(value);}
        else if(name=="genre"){setGenre(value);}
        else{
            const newImageArray = []
            for (const file of e.target.files) {   
                newImageArray.push(file)
            }
            setImages(newImageArray);
        }
    }

    async function handleSubmit(){
        console.log("URL CALLED: ",`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/upload`)
        const formData = {
            name:name,
            desc:desc,
            platform:platform,
            type:type,
            price:parseFloat(price),
            manufacturer:manufacturer,
            rating:parseInt(rating),
            sale:sale,
            saleprice:parseFloat(saleprice),
            esrb:esrb,
            genre:genre,
        }
        try{
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/upload`,{data:formData})
            console.log("Returned Data: ",data)
            if(data.success){
                toast.success(data.message)
            }
        }catch(error){
            toast.error(data.message)  
        }
    }

    return (
        <div className="pt-20 px-10 bg-white h-screen flex flex-col gap-6">
            <h1 className="mt-10 text-black font-bold text-2xl">Upload Product</h1>
            <div className="grid grid-cols-3 w-full">
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Product Name</h1>
                    <input required name="name" value={name} onChange={handleChange} type="text" className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Name" />
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Product Description</h1>
                    <textarea name="desc" value={desc} onChange={handleChange} type="textarea" className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Name" />
                </div>
                <div className=" py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Platform</h1>
                    <select required name="platform" value={platform} onChange={handleChange} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="" disabled selected>Select an option</option>
                        <option value="PS4">Playstation 4</option>
                        <option value="PS5">Playstation 5</option>
                        <option value="XBOX">Xbox one</option>
                        <option value="WII">Wii U</option>
                        <option value="VR">Virtual Reality</option>
                    </select>
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Type</h1>
                    <select required name="type" value={type} onChange={handleChange} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="" disabled selected>Select an option</option>
                        <option value="GAME">Video Game</option>
                        <option value="CONSOLE">Console</option>
                        <option value="ACCESSORY">Accessory</option>
                    </select>
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Manufacturer</h1>
                    <select required name="manufacturer" value={manufacturer} onChange={handleChange} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="" disabled selected>Select an option</option>
                        <option value="ACTIVISION">Activision</option>
                        <option value="ROCKSTAR">Rockstar</option>
                        <option value="EA">EA</option>
                    </select>
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Product Rating</h1>
                    <input required name="rating" value={rating} onChange={handleChange} type="number" min={0} max={5} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Name" />
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Product Price</h1>
                    <input required name="price" value={price} onChange={handleChange} type="number" step="0.01" min={0} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter Name" />
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <div className="flex flex-row gap-4">
                        <h1 className="text-black font-bold">Sale Information</h1>
                        <input required name="sale" checked={sale} onChange={handleChange} type="checkbox" />
                        <p className="text-black">Sale Item</p>
                    </div>
                    <input required name="saleprice" value={saleprice} onChange={handleChange} type="number" step="0.01" min={0} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Sale Price" />
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">ESRB Rating</h1>
                    <select required name="esrb" value={esrb} onChange={handleChange} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="" disabled selected>Select an option</option>
                        <option value="E">Everyone</option>
                        <option value="T">Teen</option>
                        <option value="M">Mature</option>
                    </select>
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Genre</h1>
                    <select required name="genre" value={genre} onChange={handleChange} className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="" disabled selected>Select an option</option>
                        <option value="ACTION">Action</option>
                        <option value="SPORTS">Sports</option>
                        <option value="ADVENTURE">Adventure</option>
                    </select>
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Product Images</h1>
                    <input required multiple name="images" onChange={handleChange} type="file" className="w-80 p-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Insert Image Files" />
                </div>
                <div className="py-3 flex flex-col justify-center gap-2">
                    <h1 className="text-black font-bold">Confirm Submission</h1>
                    <button onClick={handleSubmit} className="w-1/2 rounded-xl py-3 px-6 bg-slate-800 text-white">Upload</button>
                </div>
            </div>
            <ToastContainer/>

        </div>
    )
}

export default Upload